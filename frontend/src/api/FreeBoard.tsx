import axios from "axios";
import { privateApi } from ".";
import { PostFilesType } from "../type/FreeBoard";
const BASE_URL = "https://i9b106.p.ssafy.io:8080";


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


export const uploadFile = async (files: any) => {
    let data = new FormData();
    for (let i = 0; i < files.length; i++) {
        data.append('files', files[i]);
      }
    let config = {
        method: 'post',
        url: `${BASE_URL}/freeboard/upload`,
        headers: { 
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: data,
    }

    const res = await axios.request(config)
    .catch (err => {
        console.log("uploadFile catch: ", err);
        return false
    });
    if (res) {
        console.log("uploadFile then: ", res.data)
        return res.data
    }
    return false
}


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


export const deleteLike = async ( id: number ) => {
    const res = await privateApi.delete(`/freeboard/${id}/like`, )
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


export const getMyPostList = async (memberId: number, page: number) => {
    const res = await privateApi.get(`/freeboard/user-post/${memberId}?page=${page-1}`)
    .catch(err => {
        console.log("getMyPostList catch: ", err)
    })
    if (res) {
        console.log("getMyPostList then: ", res.data)
        return(res.data)
    }
    return false
};


export const getMyComments = async (memberId: number, page: number) => {
    const res = await privateApi.get(`/freeboard/user-comment/${memberId}?page=${page-1}`)
    .catch(err => {
        console.log("getMyComments catch: ", err)
    })
    if (res) {
        console.log("getMyComments then: ", res.data)
        return(res.data)
    }
    return false
};