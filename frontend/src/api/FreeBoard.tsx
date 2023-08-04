import { privateApi } from ".";


export const getPostList = async ( page: number ) => {
    const res = await privateApi.get(`/freeboard?page=${page}`)
    .catch(err => {
        console.log("getPostList catch: ", err)
    })
    if (res) {
        console.log("getPostList then: ", res.data)
        return(res.data)
    }
    return false
};


export const getPost = async ( id: number ) => {
    const res = await privateApi.get(`/freeboard/${id}`)
    .catch(err => {
        console.log("getPost catch: ", err)
    })
    if (res) {
        console.log("getPost then: ", res.data)
        return(res.data)
    }
    return false
};


export const createPost = async ( title: string, content: string ) => {
    const res = await privateApi.post(`/freeboard`)
    .catch(err => {
        console.log("postPost catch: ", err)
    })
    if (res) {
        console.log("postPost then: ", res.data)
        return(res.data)
    }
    return false
};


export const updatePost = async ( id: number, title: string, content: string ) => {
    const res = await privateApi.put(`/freeboard`)
    .catch(err => {
        console.log("postPost catch: ", err)
    })
    if (res) {
        console.log("postPost then: ", res.data)
        return(res.data)
    }
    return false
};


export const deletePost = async ( id: number ) => {
    const res = await privateApi.delete(`/freeboard/${id}`)
    .catch(err => {
        console.log("deletePost catch: ", err)
    })
    if (res) {
        console.log("deletePost then: ", res.data)
        return(res.data)
    }
    return false
};