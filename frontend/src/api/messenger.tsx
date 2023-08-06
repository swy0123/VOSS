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

export const createMessageRooms = async ( yourMemberId: number ) => {
    const res = await privateApi.get(`/messsenger`, {yourMemberId})
    .catch(err => {
        console.log("createMessageRooms catch: ", err)
    })
    if (res) {
        console.log("createMessageRooms then: ", res.data)
        return(res.data)
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