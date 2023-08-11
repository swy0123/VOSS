import { privateApi } from ".";


export const getMessageRooms = async () => {
    const res = await privateApi.get(`/messenger`)
    .catch(err => {
        console.log("getMessageRooms catch: ", err)
    })
    if (res) {
        console.log("getMessageRooms then: ", res.data)
        return res.data
    }
    return false
};


export const createMessageRoom = async ( yourMemberId: number ) => {
    console.log("yourMemberId: ", {yourMemberId})
    const res = await privateApi.post(`/messenger`, {yourMemberId})
    .catch(err => {
        console.log("createMessageRoom catch: ", err)
    })
    if (res) {
        console.log("createMessageRoom then: ", res.data)
        return res.data
    }
    return false
};


export const getMessages = async ( chatId: number, page: number, limit: number ) => {
    const res = await privateApi.get(`/messenger/${chatId}?page=${page}&limit=${limit}`)
    .catch(err => {
        console.log("getMessages catch: ", err)
    })
    if (res) {
        console.log("getMessages then: ", res.data)
        return(res.data)
    }
    return false
};


export const getUsers = async (nickname: string, page: number, limit: number) => {
    const res = await privateApi.get(`/member/find?keyword=${nickname}&page=${page}&limit=${limit}`)
    .catch(err => {
        console.log("getUsers catch: ", err)
    })
    if (res) {
        console.log("getUsers then: ", res.data)
        return(res.data)
    }
    return false
};


export const getReceive = async () => {
    const res = await privateApi.get(`/messenger/receive`)
    .catch(err => {
        console.log("getReceive catch: ", err)
    })
    if (res) {
        console.log("getReceive then: ", res.data)
        return res.data
    }
    return false
};