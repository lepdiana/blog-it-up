import React, {useState, useEffect} from 'react'
import { withAuth } from '../context/AuthProvider.js'
import EditBlog from './EditBlog.js'
import CommentForm from './CommentForm.js'
import { withCrud } from '../context/CrudProvider.js'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade';


const Blog = props => {
    
    const [toggle, setToggle] = useState(true)
    const [showComment, setshowComment] = useState(false)
    const [description, setDescription] = useState(false)
    
    const showCommentForm = () => {
        setshowComment(!showComment)

    }

    const {_id} = props.post


    
    const currentUser = JSON.parse(localStorage.getItem('user'))
    
    const toggler = () => {
        setToggle(!toggle )
    }

    const showDescription = () => {
        setDescription(!description)
    }
    

    const {post} = props
  
    return (
        <AllBlog>
            {toggle ? 
            

                <> 
                    <BlogTitle>{post.title}</BlogTitle>
                    <p>Posted by <Author>{post.author}</Author> on <PublishedDate>{post.date}</PublishedDate></p>
                    <BlogImage src={post.image} alt={post.title}/>
                        <Fade top when={description}>
                            <p id='description' >{post.description}</p>
                        </Fade>
                    <p>Category: {post.category}</p>
                    <button onClick={showDescription} >Read more</button>
                    <button onClick={() => props.putFavoriteBlogPosts(currentUser._id, post)}>Favorite</button>
                    <button onClick={toggler}>{!toggle ? 'Cancel' : 'Edit'}</button>
                    <button onClick={() => props.deleteBlogPost(post._id)}>Delete</button>
                   
                </>
                :
                <>
                <EditBlog toggler={toggler} post={post} />
                <button onClick={toggler}>{!toggle ? 'Cancel' : 'Edit'}</button>
                <button onClick={() => props.deleteBlogPost(post._id)}>Delete</button>
                <button onClick={showCommentForm}>Add a comment</button>
                {showComment === true ? <CommentForm _id={_id} /> : null }
            </>
           }
          
        
      

        </AllBlog>
    )
}

export default withAuth(withCrud(Blog))

const AllBlog = styled.div`
    
    text-align: center;
    color: #A9A9A9;
    
    
`

const BlogTitle = styled.h1`
    text-transform: uppercase;
    color: #333333;
`

const Author = styled.p`
    display: inline;
    font-style: italic;
`

const PublishedDate = styled.p`
    display: inline;
    text-decoration: underline;
`

const BlogImage = styled.img`
    width: 200px;
`