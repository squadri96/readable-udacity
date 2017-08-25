import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost,addComment } from '../actions'
import Modal from 'react-modal'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import Loading from 'react-loading'
import '../App.css';
import ReadableNav from './Nav'
import ListPosts from './ListPosts'
import {Route} from 'react-router-dom'
import { withRouter } from 'react-router'
import DetailedPost from './DetailedPost'



class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Readable</h1>
        <ReadableNav />
        <Route exact path='/' render={(props)=>(
          <ListPosts {...this.props} {...props}/>
        )}/>
        <Route exact path='/:category' render={(props)=>(
          <ListPosts categorySelected='true'/>
        )}/>
        <Route exact path='/:category/:postId' render={(props)=>(
            <DetailedPost {...this.props} {...props}/>
        )}/>  
      </div>

    );
  }
}

function mapStateToProps ({ }) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    }
}

export default withRouter(connect(  mapStateToProps,
  mapDispatchToProps
)(App))
