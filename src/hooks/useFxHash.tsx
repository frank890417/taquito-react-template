import React, { useEffect, useState } from "react";

const useFxHash = (userAddress: string) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch("https://api.fxhash.xyz/graphql", {
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6",
                "content-type": "application/json",
                "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "https://www.fxhash.xyz/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `{\"operationName\":\"UserCollection\",\"variables\":{\"id\":\"${userAddress}\",\"skip\":0,\"take\":40,\"filters\":{},\"sort\":{\"id\":\"DESC\"}},\"query\":\"fragment MediaImage on MediaImage {\\n  cid\\n  width\\n  height\\n  placeholder\\n  mimeType\\n  metadata\\n  processed\\n  __typename\\n}\\n\\nfragment UserBadgeInfos on User {\\n  id\\n  type\\n  name\\n  avatarUri\\n  avatarMedia {\\n    ...MediaImage\\n    __typename\\n  }\\n  flag\\n  __typename\\n}\\n\\nfragment Author on GenerativeToken {\\n  author {\\n    ...UserBadgeInfos\\n    type\\n    collaborators {\\n      ...UserBadgeInfos\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nquery UserCollection($id: String!, $take: Int, $skip: Int, $sort: ObjktsSortInput, $filters: ObjktFilter) {\\n  user(id: $id) {\\n    id\\n    objkts(take: $take, skip: $skip, sort: $sort, filters: $filters) {\\n      id\\n      version\\n      assigned\\n      rarity\\n      iteration\\n      generationHash\\n      captureMedia {\\n        ...MediaImage\\n        __typename\\n      }\\n      metadata\\n      owner {\\n        ...UserBadgeInfos\\n        __typename\\n      }\\n      issuer {\\n        name\\n        flag\\n        generativeUri\\n        labels\\n        ...Author\\n        __typename\\n      }\\n      name\\n      createdAt\\n      activeListing {\\n        id\\n        version\\n        price\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        }).then(res => res.json()).then(res => {
            setData(res);
        })

    }, [userAddress])
    return {
        data
    }

}
export default useFxHash