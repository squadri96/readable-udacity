import * as api from '../utils/api'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SET_POST_MODAL = 'SET_POST_MODAL'
export const CHANGE_POST_VOTE = "CHANGE_POST_VOTE"
export const CHANGE_COMMENT_VOTE = "CHANGE_COMMENT_VOTE"
export const SET_SORT = "SET_SORT"
export const SET_ADD_POST_MODAL = "SET_ADD_POST_MODAL"
export const DELETE_POST = "DELETE_POST"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const SET_EDIT_POST_MODAL = "SET_EDIT_POST_MODAL"
export const SET_EDIT_COMMENT_MODAL = "SET_EDIT_COMMENT_MODAL"
export const SET_COMMENT_SORT = "SET_COMMENT_SORT"

export function setCommentSort({sort}){
  return{
    type: SET_COMMENT_SORT,
    sort
  }
}

export function editCommentModal({ id,open }){
  return{
    type: SET_EDIT_COMMENT_MODAL,
    id,
    open
  }
}

export function editPostModal({ id,open }){
  return{
    type: SET_EDIT_POST_MODAL,
    id,
    open
  }
}

export function addPostModal(){
  return{
    type: SET_ADD_POST_MODAL
  }
}

export function setSort({sort}){
  return{
    type: SET_SORT,
    sort
  }
}

export function postModal({ id,open }){
  return{
    type: SET_POST_MODAL,
    id,
    open
  }
}


export function receiveCategories (cats){
  return{
    type: RECEIVE_CATEGORIES,
    cats
  }
}

export const fetchCats = () => dispatch => (
  api.getAllCategories().then(categories => {
    dispatch(receiveCategories(categories))
  })
);

export function selectCategory ({cat}){
  return{
    type: SELECT_CATEGORY,
    cat
  }
}

export const fetchPosts = () => dispatch => (
  api.getAllPosts().then(posts => {
    dispatch(receivePosts(posts))
  })
);

export function receivePosts (posts){
  return{
    type: RECEIVE_POSTS,
    posts
  }
}

export const fetchComments = (postId) => dispatch => (
  api.getAllComments(postId).then(comments => {
    dispatch(receiveComments(comments))
  })
);

export function receiveComments (comments){
  return{
    type: RECEIVE_COMMENTS,
    comments
  }
}

export function postVote(post){
  return{
    type: CHANGE_POST_VOTE,
    post
  }
}

export const changePostVote = ({ id,value }) => dispatch => {
  if(value===1){
    api.votePost(id,"upVote").then(newPostObj=>{
      dispatch(postVote(newPostObj))
    })
  }else{
    api.votePost(id,"downVote").then(newPostObj=>{
      dispatch(postVote(newPostObj))
    })
  }
  
}

export function commentVote(comment){
  return{
    type: CHANGE_COMMENT_VOTE,
    comment
  }
}

export const changeCommentVote = ({ id,value }) => dispatch => {
  if(value===1){
    api.voteComment(id,"upVote").then(newCommObj=>{
      dispatch(commentVote(newCommObj))
    })
  }else{
    api.voteComment(id,"downVote").then(newCommObj=>{
      dispatch(commentVote(newCommObj))
    })
  }
}

export function addedComment({id,parentId,timestamp,body,author,deleted,parentDeleted,voteScore}){
  return{
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    deleted,
    parentDeleted,
    voteScore
    }
}

export const addComment = (addCommentObj) => dispatch => {
  api.addComment(addCommentObj).then(newCommObj=>{
    dispatch(addedComment(newCommObj))
  })
}

export function addedPost({id,timestamp,title,body,author,category,voteScore,deleted}){
  // console.log('addedPost author'+ author)
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}

export const addPost = (addPostObj) => dispatch =>{
  api.addPost(addPostObj).then(newPostObj=>{
    newPostObj['author'] = addPostObj['author']
    dispatch(addedPost(newPostObj));
  })
}

export function deletedPost(id){
  return{
    type: DELETE_POST,
    id:id
  }
}

export const deletePost = ({id}) => dispatch => {
  api.deletePost(id).then(dispatch(deletedPost(id)))
}

export function deletedComment(id){
  return{
    type: DELETE_COMMENT,
    id:id
  }
}

export const deleteComment = ({id}) => dispatch => {
  api.deleteComment(id).then(dispatch(deletedComment(id)))
}


export const submitEditPost = (pObj) => dispatch => {
  api.editPost(pObj)
}

export const submitEditComment = (cObj) => dispatch => {
  api.editComment(cObj)
}