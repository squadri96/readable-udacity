import React, { Component } from 'react';
import { addComment,addPost,fetchPosts,fetchComments,addPostModal,fetchCats,editPostModal,submitEditPost,editCommentModal } from '../actions'
import { connect } from 'react-redux'
import { Form,FormControl,ControlLabel,Button } from 'react-bootstrap';
import { withRouter } from 'react-router'
import  Post  from './Post'
import Modal from 'react-modal'
import { toUpper } from '../utils/helper'
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4'

class ListPosts extends Component{

    componentDidMount(){
        this.props.receivePosts().then(()=>{
            for (let p of this.props.posts){
                this.props.receiveComments(p.id);
            }
        });
        this.props.receiveCategories();
    }

    closeAddPostModal = () =>{
        this.props.addPostModal();
    }

    submitPost = () => {
        let postTitle = ReactDOM.findDOMNode(this.refs.postTitle).value;
        let postBody = ReactDOM.findDOMNode(this.refs.postBody).value; 
        let postAuthor = ReactDOM.findDOMNode(this.refs.postAuthor).value;
        let postCat =  ReactDOM.findDOMNode(this.refs.postCategory).value;
        if(postTitle==="" || postBody==="" || postAuthor==="" || postCat===""){
            alert("Please make sure both a comment AND name is entered.");
            return;
        }
        let postObj = {
            id:uuid(),
            timestamp:Date.now(),
            title:postTitle,
            body:postBody,
            author:postAuthor,
            category:postCat
        }
        this.props.addPost(postObj);
    }

    submitEditPost= (id) => {
        let postTitle = ReactDOM.findDOMNode(this.refs.editTitle).value;
        let postBody = ReactDOM.findDOMNode(this.refs.editBody).value;
        this.props.submitEditPost({title:postTitle,body:postBody,id:id}); 
    }

    closeEditPostModal = () =>{
        this.props.editPostM({id:null,open:false})
    }

    render(){
        let {posts,categories,categorySelected,sort,showAddPostModal,editPostModal} = this.props;
        let editPost;
        posts = posts.filter((post)=>(!post.deleted))
        if(categorySelected==='true'){
            const {category} = this.props.match.params
            posts = posts.filter((post)=>(post.category===category))
        }
        if(sort==="voteScore" || sort==="none"){
            posts.sort((p1,p2)=>(p2.voteScore-p1.voteScore));
        }else if(sort==="timestamp"){
            posts.sort((p1,p2)=>(p2.timestamp-p1.timestamp));
        }
        if(editPostModal.open){
           editPost = posts.filter((post)=>(post.id===editPostModal.id))[0];
        }

        return(
                <div>
                    {posts.map((post)=>(<Post key={post.id} postInfo={post}/>))}
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={showAddPostModal}
                        onRequestClose={this.closeAddPostModal}
                        contentLabel='Modal'>
                        <Form>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter post title here..."
                                ref="postTitle"
                            />
                            <ControlLabel>Body</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                type="text"
                                placeholder="Enter post body here..."
                                ref="postBody"
                            />
                            <ControlLabel>Author</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter your author name here..."
                                ref="postAuthor"
                            />
                            <ControlLabel>Select Category</ControlLabel>
                            <FormControl ref="postCategory" componentClass="select" placeholder="select">
                                <option value="">Select Category</option>
                                {Object.keys(categories).map((cat)=>(
                                <option key={cat} value={cat}>{toUpper(cat)}</option>
                                ))}
                            </FormControl>
                            <Button style={{marginTop:10}}className="pull-right" type="submit" onClick={() => this.submitPost()}>Submit</Button>
                        </Form>
                    </Modal>
                    {editPostModal.open &&
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={editPostModal.open}
                        onRequestClose={this.closeEditPostModal}
                        contentLabel='Modal'>
                        <Form>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                defaultValue={editPost.title}
                                type="text"
                                placeholder="Enter post title here..."
                                ref="editTitle"
                            />
                            <ControlLabel>Body</ControlLabel>
                            <FormControl
                                defaultValue={editPost.body}
                                componentClass="textarea"
                                type="text"
                                placeholder="Enter post body here..."
                                ref="editBody"
                            />
                            <Button style={{marginTop:10}}className="pull-right" type="submit" onClick={() => this.submitEditPost(editPost.id)}>Submit</Button>
                        </Form>
                    </Modal>
                    }
                </div>
                
        )}
    
    }
    
    function mapStateToProps ({ posts,comments,selectedCategory,postModal,sort,showAddPostModal,categories,editPostModal }) {
        return {
          posts: Object.keys(posts).map((key)=>{
            return {
                ...posts[key],
                id:key,
                comments: Object.keys(comments).filter((cKey)=>(comments[cKey].parentId==key&&!comments[cKey].deleted)).map((cKey)=>{
                    return {...comments[cKey],id:cKey};
                }),
                open:postModal[key]
            }
            }),
            selectedCategory:selectedCategory['category'],
            sort:sort.sort,
            showAddPostModal:showAddPostModal.show,
            categories,
            editPostModal
        }
      }
      
      function mapDispatchToProps (dispatch) {
        return {
            addComment: (data) => dispatch(addComment(data)),
            addPost: (data) => dispatch(addPost(data)),
            receivePosts: () => dispatch(fetchPosts()),
            receiveComments: (postId) => dispatch(fetchComments(postId)),
            addPostModal: () => dispatch(addPostModal()),
            receiveCategories: () => dispatch(fetchCats()),
            editPostM: (data) => dispatch(editPostModal(data)),
            submitEditPost: (data) => dispatch(submitEditPost(data))
        }
      }
      
    
    export default withRouter(connect(  mapStateToProps,
        mapDispatchToProps
      )(ListPosts))