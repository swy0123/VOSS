import { privateApi } from ".";
import { PostFilesType } from "../type/FreeBoard";


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

    const res = await privateApi.get(`/freeboard?${sortinput}${condinput}page=${page-1}`)
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


export const createPost = async ( title: string, content: string, files: PostFilesType[] ) => {
    const res = await privateApi.post(`/freeboard`, {title, content, files})
    .catch(err => {
        console.log("createPost catch: ", err)
    })
    if (res) {
        console.log("createPost then: ", res.data)
        return true
    }
    return false
};


export const updatePost = async ( id: number, title: string, content: string, deleteFileIds: number[], newFiles: PostFilesType[] ) => {
    const res = await privateApi.put(`/freeboard/${id}`, {title, content, deleteFileIds, newFiles})
    .catch(err => {
        console.log("updatePost catch: ", err)
    })
    if (res) {
        console.log("updatePost then: ", res.data)
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


export const uploadFile = async ( data: any ) => {
    const res = await privateApi.post(`/freeboard/upload`, data)
    .catch(err => {
        console.log("uploadFile catch: ", err)
    })
    if (res) {
        console.log("uploadFile then: ", res.data)
        return(res.data)
    }
    return false
};


export const postLike = async ( id: number ) => {
    const res = await privateApi.post(`/freeboard/${id}/like`, )
    .catch(err => {
        console.log("postLike catch: ", err)
    })
    if (res) {
        console.log("postLike then: ", res.data)
        return(res.data)
    }
    return false
};


export const getComments = async ( id: number ) => {
    const res = await privateApi.get(`/freeboard/${id}/comment`)
    .catch(err => {
        console.log("getComment catch: ", err)
    })
    if (res) {
        console.log("getComment then: ", res.data)
        return res.data
    }
    return false
};


export const createComment = async ( id: number, content: string ) => {
    const res = await privateApi.post(`/freeboard/${id}/comment`, {content})
    .catch(err => {
        console.log("createComment catch: ", err)
    })
    if (res) {
        console.log("createComment then: ", res.data)
        return(res.data)
    }
    return false
};


export const updateComment = async ( postId: number, commentId: number, content: string ) => {
    const res = await privateApi.put(`/freeboard/${postId}/comment/${commentId}`, {content})
    .catch(err => {
        console.log("UpdateComment catch: ", err)
    })
    if (res) {
        console.log("UpdateComment then: ", res.data)
        return(res.data)
    }
    return false
};


export const deleteComment = async ( postId: number, commentId: number ) => {
    const res = await privateApi.delete(`/freeboard/${postId}/comment/${commentId}`)
    .catch(err => {
        console.log("deleteComment catch: ", err)
    })
    if (res) {
        console.log("deleteComment then: ", res.data)
        return(res.data)
    }
    return false
};