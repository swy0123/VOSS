import { privateApi } from ".";


export const getPostList = async ( sort: string, cond: string, input: string, page: number) => {

    let sortinput = ""
    let condinput = ""
    if (sort !== "1") {
        if (sort === "2") { sortinput = "sort=hit&" } 
        else { sortinput = "sort=like&" }         
    }
    if (input.length > 0) {
        if (cond === "1") { condinput = `title=${input}&` }
        else if (cond === "2") { condinput = `content=${input}&`}
        else { condinput = `nickname=${input}&` }
    }

    const res = await privateApi.get(`/freeboard?${sortinput}${condinput}page=${page}`)
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

