import React, { Component } from 'react';
import { fetchCats,setSort,addPostModal } from '../actions'
import { connect } from 'react-redux'
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap'
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router'
import { toUpper,sortName } from '../utils/helper'

class ReadableNav extends Component{


    componentDidMount(){
        this.props.receiveCategories();
    }

    selectSort = (selectedKey) =>{
        this.props.setSort({sort:selectedKey})

    }

    sortName = (name) =>{
        if(name==='voteScore')
            return "Vote Score"
        else if(name==="timestamp")
            return "Date"
    }

    createPost = () => {
        this.props.addPostModal()
    }

    render(){
        const {selectCategory,categories,selectedCategory,sort} = this.props;
        return(
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
            <Navbar.Brand>
                <div>Categories:</div>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav>
            {Object.keys(categories).map((cat)=>{
                return <LinkContainer key={cat} to={`/${categories[cat]}`}><NavItem eventKey={cat}>{toUpper(cat)}</NavItem></LinkContainer>
            })}
            <IndexLinkContainer key={'All'} to={`/`}><NavItem eventKey={'All'}>All Categories</NavItem></IndexLinkContainer>
            <NavDropdown eventKey={"none"} title="Sort" id="sort-nav-dropdown" onSelect={this.selectSort}>
                <MenuItem eventKey={"voteScore"}>Vote Score</MenuItem>
                <MenuItem eventKey={"timestamp"}>Date</MenuItem>
                <MenuItem eventKey={"none"}>None</MenuItem>
            </NavDropdown>
            </Nav>
            <Navbar.Text pullRight>{((sort!=="none")&&`Currently sorted by: ${sortName(sort)}`)}</Navbar.Text>
            <Nav pullRight><NavItem className="pull-right" eventKey={"Create Post"} onClick={()=>this.createPost()}>{"ADD POST"}</NavItem></Nav>
            </Navbar.Collapse>
        </Navbar>
        )}

}

function mapStateToProps ({ categories,selectedCategory,sort }) {
    return {
      categories,
      selectedCategory,
      sort:sort.sort
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      receiveCategories: () => dispatch(fetchCats()),
      setSort: (data) => dispatch(setSort(data)),
      addPostModal: () => dispatch(addPostModal())
    }
  }
  

export default withRouter(connect(  mapStateToProps,
    mapDispatchToProps
  )(ReadableNav))