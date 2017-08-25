import React, { Component } from 'react';
import { fetchPosts,fetchComments,addComment,addPost,postModal,changeCommentVote,changePostVote,deletePost,deleteComment,editPostModal,submitEditComment,editCommentModal,setCommentSort } from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button,FormGroup,ControlLabel,FormControl,Form,NavDropdown,MenuItem,Nav } from 'react-bootstrap'
import Modal from 'react-modal'
import { formatDate,sortName } from '../utils/helper'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import CloseIcon from 'react-icons/lib/fa/close'
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4'



class DetailedPost extends Component{

    componentDidMount(){
        this.props.receivePosts().then(()=>{
            for (let p of this.props.posts){
                this.props.receiveComments(p.id);
            }
        });
    }
    editComment = (id) => {
        this.props.editCommentM({id:id,open:true})
    }
    closeEditCommentModal = () =>{
        this.props.editCommentM({id:null,open:false})
    }
    submitEditC = (id) => {
        let body = ReactDOM.findDOMNode(this.refs.editCommentBody).value;
        this.props.submitEditComment({id:id,body,timestamp:Date.now()})
    }
    selectCommentSort = (eventKey) => {
        this.props.setCommentSort({sort:eventKey})
    }
    
    deleteComm = (id) => {
        this.props.deleteComment({id:id})
    }
    
    decreaseCommentVote = (cId) => {
        this.props.changeCommentVote({id:cId,value:-1});
    }
        
    increaseCommentVote = (cId) => {
        this.props.changeCommentVote({id:cId,value:1});
    }

    decreasePostVote = (id) => {
        this.props.changePostVote({id:id,value:-1});
    }

    increasePostVote = (id) => {
        this.props.changePostVote({id:id,value:1});
    }
    
    submitComment = (id) => {
        let comment = ReactDOM.findDOMNode(this.refs.comment).value;
        let name = ReactDOM.findDOMNode(this.refs.name).value; 
        if(name==="" || comment===""){
            alert("Please make sure both a comment AND name is entered.");
            return;
        }
        let commentObj = {
            id:uuid(),
            parentId:id,
            timestamp: Date.now(),
            author: name,
            body: comment,
        }
        this.props.addComment(commentObj);
        ReactDOM.findDOMNode(this.refs.comment).value = "";
        ReactDOM.findDOMNode(this.refs.name).value = ""; 
    }

    render(){
        let { editCommentModal,commentSort,posts } = this.props;
        const {postId} = this.props.match.params
        let postInfo = this.props.posts.filter((post)=>(post.id===postId))[0]
        if(commentSort==="voteScore" || commentSort==="none"){
            postInfo.comments.sort((p1,p2)=>(p2.voteScore-p1.voteScore));
        }else if(commentSort==="timestamp"){
            postInfo.comments.sort((p1,p2)=>(p2.timestamp-p1.timestamp));
        }
    
        return(
        <div>
            <div className="well">
            <div className="media">
                <div className="media-body">
                    <div className="pull-left">
                        <button className='icon-btn stackButton'  onClick={()=>this.increasePostVote(postInfo.id)}><ArrowUpIcon size={30}/></button>
                        <button className='icon-btn stackButton'  onClick={()=>this.decreasePostVote(postInfo.id)}><ArrowDownIcon size={30}/></button>
                    </div>
                    <h4 className="media-heading text-center">{postInfo.title}</h4>
                <p className="text-right">By {postInfo.author}</p>
                <p className="text-center">{postInfo.body}</p>
                <ul className="text-center list-inline list-unstyled">
                <li><span> Vote Score {postInfo.voteScore}</span></li>
                    <li>|</li>
                    <li><span><i className="glyphicon glyphicon-calendar"></i> {formatDate(new Date(postInfo.timestamp))} </span></li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="well">
                <div className="media">
                    <div className="media-body">
                        <h4 className="media-heading">Comments({postInfo.comments.length})</h4>
                        <span className="pull-right">{((commentSort!=="none")&&`Currently sorted by: ${sortName(commentSort)}`)}</span>
                        <Nav bsStyle="tabs">
                        <NavDropdown eventKey={"none"} title="Sort" id="sort-nav-dropdown" onSelect={this.selectCommentSort}>
                            <MenuItem eventKey={"voteScore"}>Vote Score</MenuItem>
                            <MenuItem eventKey={"timestamp"}>Date</MenuItem>
                            <MenuItem eventKey={"none"}>None</MenuItem>
                        </NavDropdown>
                        </Nav>
                        {postInfo.comments.map((comment)=>(
                        <div key={comment.id} className="well">
                            <div className="media">
                                <div className="media-body">
                                    <button
                                    className='icon-btn pull-right'
                                    onClick={()=>this.deleteComm(comment.id)}>
                                    <CloseIcon></CloseIcon>
                                    </button>
                                    <div className='pull-left'>
                                        <button className='icon-btn stackButton' onClick={()=>this.increaseCommentVote(comment.id)}><ArrowUpIcon size={30}/></button>
                                        <button className='icon-btn stackButton' onClick={()=>this.decreaseCommentVote(comment.id)}><ArrowDownIcon size={30}/></button>
                                    </div>
                                    <span> Vote Score {comment.voteScore} </span>
                                    <span>| </span>
                                    <span><i className="glyphicon glyphicon-calendar"></i> {formatDate(new Date(comment.timestamp))} </span>
                                    <span className="pull-right">By {comment.author}</span>
                                    <p style={{marginTop:5}}>{comment.body}</p>
                                    <ul className="list-inline list-unstyled">
                                    <li></li> 
                                    <span><Button onClick={()=>this.editComment(comment.id)} className="pull-right" bsStyle="primary" bsSize="xsmall">Edit</Button></span>
                                    </ul> 
                                </div>
                            </div>
                            <Modal
                                className='modal'
                                overlayClassName='overlay'
                                isOpen={editCommentModal.open}
                                onRequestClose={this.closeEditCommentModal}
                                contentLabel='Modal'>
                                <Form>
                                    <ControlLabel>Body</ControlLabel>
                                    <FormControl
                                        defaultValue={comment.body}
                                        componentClass="textarea"
                                        type="text"
                                        placeholder="Enter post body here..."
                                        ref="editCommentBody"
                                    />
                                    <Button style={{marginTop:10}}className="pull-right" type="submit" onClick={() => this.submitEditC(comment.id)}>Submit</Button>
                                </Form>
                            </Modal>
                        </div>
                        ))}
                        <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Enter Comment</ControlLabel>
                        <FormControl componentClass="textarea" ref="comment" placeholder="Type comment here..." />
                        </FormGroup>
                        <FormGroup bsSize="small">
                        <ControlLabel>Enter Name</ControlLabel>
                        <FormControl ref="name" type="text" placeholder="Type name here..." />
                        </FormGroup>
                        <Button className="pull-right" type="submit" onClick={() => this.submitComment(postInfo.id)}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

function mapStateToProps ({editCommentModal,commentSort,posts,comments}) {
    console.log(posts)
    return {
        editCommentModal,
        commentSort:commentSort.sort,
        posts: Object.keys(posts).map((key)=>{
            return {
                ...posts[key],
                id:key,
                comments: Object.keys(comments).filter((cKey)=>(comments[cKey].parentId==key&&!comments[cKey].deleted)).map((cKey)=>{
                    return {...comments[cKey],id:cKey};
                })
            }
            })
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
            setPostModalState: (data) => dispatch(postModal(data)),
            changePostVote: (data) => dispatch(changePostVote(data)),
            changeCommentVote: (data) => dispatch(changeCommentVote(data)),
            addComment: (data) => dispatch(addComment(data)),
            deletePost: (data) => dispatch(deletePost(data)),
            deleteComment: (data) => dispatch(deleteComment(data)),
            editPostModal: (data) => dispatch(editPostModal(data)),
            submitEditComment: (data) => dispatch(submitEditComment(data)),
            editCommentM: (data) => dispatch(editCommentModal(data)),
            setCommentSort: (data) => dispatch(setCommentSort(data)),
            receivePosts: () => dispatch(fetchPosts()),
            receiveComments: (postId) => dispatch(fetchComments(postId)),
    }
  }
  
  export default withRouter(connect(  mapStateToProps,
    mapDispatchToProps
  )(DetailedPost))