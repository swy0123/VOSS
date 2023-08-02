import { privateApi } from ".";


export const getProfile = async (id: number ) => {
    const res = await privateApi.get(`/member/info/${id}`)
    .catch(err => {
        console.log("getProfile catch: ", err)
    })
    if (res) {
        console.log("getProfile then: ", res.data)
        return res.data
    };
    return false
};

export const getFollowers = async (id: number ) => {
    const res = await privateApi.get(`/member/follower/${id}`)
    .catch(err => {
        console.log("getFollower catch: ", err)
    })
    if (res) {
        console.log("getFollower then: ", res.data)
        return res.data
    };
    return false
};

export const getFollowings = async (id: number ) => {
    const res = await privateApi.get(`/member/following/${id}`)
    .catch(err => {
        console.log("getFollowing catch: ", err)
    })
    if (res) {
        console.log("getFollowing then: ", res.data)
        return res.data
    };
    return false
};

export const postFollow = async (id: number ) => {
    let data = {targetId: id}
    console.log(data);
    const res = await privateApi.post("/member/follow", data)
    .catch((err: Error) => {
        console.log("postFollow catch: ", err)
    })
    if (res) {
        console.log("postFollow then: ", res.data)
        return res.data
    }
    return false
};

export const deleteUnfollow = async (id: number ) => {
    const res = await privateApi.delete(`/member/unfollow/${id}`)
    .catch((err: Error) => {
        console.log("deleteUnfollow catch: ", err)
    })
    if (res) {
        console.log("deleteUnfollow then: ", res.data)
        return res.data
    }
    return false
};
