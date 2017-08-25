import React, { Component } from 'react';
import { addComment,addPost,postModal,changeCommentVote,changePostVote,deletePost,deleteComment,editPostModal,submitEditComment,editCommentModal,setCommentSort } from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button,FormGroup,ControlLabel,FormControl,Form,NavDropdown,MenuItem,Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Modal from 'react-modal'
import { formatDate,sortName } from '../utils/helper'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import CloseIcon from 'react-icons/lib/fa/close'
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom'
import uuid from 'uuid/v4'

class Post extends Component{

    openPostModal = () => {
        this.props.setPostModalState({id:this.props.postInfo.id,open:true});
    }

    closePostModal = () =>{
        this.props.setPostModalState({id:this.props.postInfo.id,open:false});
    }

    decreasePostVote = () => {
        this.props.changePostVote({id:this.props.postInfo.id,value:-1});
    }

    increasePostVote = () => {
        this.props.changePostVote({id:this.props.postInfo.id,value:1});
    }

    deletePost = () => {
        this.props.deletePost({id:this.props.postInfo.id})
    }

    editPost = () => {
        this.props.editPostModal({id:this.props.postInfo.id,open:true})
    }


    render(){
        let { postInfo } = this.props;
        return(
        <div className="well">
            <div className="media">
                <div className="media-body">
                    <div className="pull-left">
                        <button className='icon-btn stackButton'  onClick={()=>this.increasePostVote()}><ArrowUpIcon size={30}/></button>
                        <button className='icon-btn stackButton'  onClick={()=>this.decreasePostVote()}><ArrowDownIcon size={30}/></button>
                    </div>
                    <button
                    className='icon-btn pull-right'
                    onClick={this.deletePost}>
                    <CloseIcon></CloseIcon>
                    </button>
                    <h4 className="media-heading">{postInfo.title}</h4>
                    <p className="text-right">By {postInfo.author}</p>
                    <ul className="list-inline list-unstyled">
                        <li><span> Vote Score: {postInfo.voteScore}</span></li>
                        <li>|</li>
                        <span><i className="glyphicon glyphicon-comment"></i> {Object.keys(postInfo.comments).length}</span>
                        <span><LinkContainer className="pull-right" key={postInfo.id} to={`/${postInfo.category}/${postInfo.id}`}><Button bsStyle="primary" bsSize="xsmall">Details</Button></LinkContainer></span>
                        <span><Button onClick={()=>this.editPost()} className="pull-right" bsStyle="primary" bsSize="xsmall">Edit</Button></span>
                    </ul>
                </div>
            </div>
        </div>
        )
    }
            
    
    }
    
    function mapStateToProps ({editCommentModal,commentSort}) {
        return {
            editCommentModal,
            commentSort:commentSort.sort
        }
      }
      
      function mapDispatchToProps (dispatch) {
        return {
            // setPostModalState: (data) => dispatch(postModal(data)),
            changePostVote: (data) => dispatch(changePostVote(data)),
            // changeCommentVote: (data) => dispatch(changeCommentVote(data)),
            // addComment: (data) => dispatch(addComment(data)),
            deletePost: (data) => dispatch(deletePost(data)),
            // deleteComment: (data) => dispatch(deleteComment(data)),
            editPostModal: (data) => dispatch(editPostModal(data)),
            // submitEditComment: (data) => dispatch(submitEditComment(data)),
            // editCommentM: (data) => dispatch(editCommentModal(data)),
            // setCommentSort: (data) => dispatch(setCommentSort(data))
        }
      }
      
    
    export default withRouter(connect(mapStateToProps,
        mapDispatchToProps
      )(Post))