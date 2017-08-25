import { combineReducers } from 'redux'

import {
  ADD_POST,
  ADD_COMMENT,
  RECEIVE_CATEGORIES,
  SELECT_CATEGORY,
  RECEIVE_POSTS,
  RECEIVE_COMMENTS,
  SET_POST_MODAL,
  CHANGE_COMMENT_VOTE,
  CHANGE_POST_VOTE,
  SET_SORT,
  SET_ADD_POST_MODAL,
  DELETE_POST,
  DELETE_COMMENT,
  SET_EDIT_POST_MODAL,
  SET_EDIT_COMMENT_MODAL,
  SET_COMMENT_SORT
} from '../actions'

function commentSort (state={sort:"none"},action){
  const{sort} = action
  switch(action.type){
    case SET_COMMENT_SORT:
    return{
      sort
    }
    default:
    return state
  }
}

function editCommentModal (state= {open:false,id:null},action){
  const {open,id} = action
  switch (action.type){
    case SET_EDIT_COMMENT_MODAL:
    return{
      open,
      id
    }
    default:
    return state
  }
}

function editPostModal (state= {open:false,id:null},action){
  const {open,id} = action
  switch (action.type){
    case SET_EDIT_POST_MODAL:
    return{
      open,
      id
    }
    default:
    return state
  }
}

function showAddPostModal(state={show:false},action){
  switch(action.type){
    case SET_ADD_POST_MODAL:
      return{
        show:!state.show
      }
    default:
    return state
  }
}

function sort (state={sort:"none"},action){
  const{sort} = action
  switch(action.type){
    case SET_SORT:
    return{
      sort
    }
    default:
    return state
  }
}

function postModal (state= {open:false},action){
  const {open,id} = action
  switch (action.type){
    case SET_POST_MODAL:
    return{
      ...state,
      [id]:open
    }
    default:
    return state
  }
}

function categories (state = {},action){
  const {cats} = action;
  switch (action.type){
    case RECEIVE_CATEGORIES:
    let catsObj = Object.keys(cats).reduce((co,key)=>{co[cats[key]['name']]=cats[key]['path'];return co},{});
    return{
      ...state,
      ...catsObj
    }
    default:
    return state
  }
}


function selectedCategory (state={},action){
  const {cat} = action;
  switch (action.type){
    case SELECT_CATEGORY:
    return{
      ['category']:cat
    }
    default:
    return state
  }
}

function comments (state = {},action) {
  const {id,parentId,timestamp,body,author,voteScore,deleted,parentDeleted,comments,value,comment} = action;
  switch (action.type){
    case ADD_COMMENT:
      return{
        ...state,
        [id]:{
          parentId,
          timestamp,
          body,
          author,
          voteScore,
          deleted,
          parentDeleted,
          id
        }
      }
      case RECEIVE_COMMENTS:
      let commentsObj = Object.keys(comments).reduce((co,key)=>{co[comments[key].id]=comments[key];return co},{});
      return{
        ...state,
        ...commentsObj
      }
      case CHANGE_COMMENT_VOTE:
      return{
        ...state,
        [comment.id]:comment
      }
      case DELETE_POST:
      let deletedP = Object.keys(state).filter((comment)=>(comment.parentId===id)).reduce((dp,key)=>{dp[key]={...state[key],["parentDeleted"]:true};return dp;},{})
      return{
        ...state,
        ...deletedP
      }
      case DELETE_COMMENT:
      return{
        ...state,
        [id]:{
          ...state[id],
          deleted:true
        }
      }
    default:
      return state
  }

}

function posts (state = {}, action) {
  const { id,timestamp,title,body,author,category,voteScore,deleted,posts,value,post } = action;
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [id]:{
          timestamp,
          title,
          body,
          author,
          category,
          voteScore,
          deleted,
          id
        }
      }
    case RECEIVE_POSTS:
      let postsObj = Object.keys(posts).reduce((po,key)=>{po[posts[key].id]=posts[key];return po},{});
      return{
        ...state,
        ...postsObj
      }
      case CHANGE_POST_VOTE:
      return{
        ...state,
        [post.id]:post
      }
      case DELETE_POST:
      console.log(id);
      return{
        ...state,
        [id]:{
          ...state[id],
          ['deleted']:true
        }
      }
    default :
      return state
  }
}

export default combineReducers({
  categories,
  comments,
  posts,
  selectedCategory,
  postModal,
  sort,
  showAddPostModal,
  editPostModal,
  editCommentModal,
  commentSort
})