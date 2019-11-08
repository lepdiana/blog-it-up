import React, { useEffect } from 'react'
import { withAuth } from '../context/AuthProvider.js'
import { withCrud } from '../context/CrudProvider.js'
import styled from 'styled-components'

const Favorites = props => {

    const currentUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        props.getFavoriteBlogPosts(currentUser._id)
    }, [])

    let mappedFavorites 
    if(props.favoriteBlogPosts[0]){
        mappedFavorites = props.favoriteBlogPosts.map((favorite, i) => 
                                                        <AllBlog key={i}>
                                                            <BlogTitle>{favorite.title}</BlogTitle>
                                                            <p>Posted by <Author>{favorite.author}</Author> on <PublishedDate>{favorite.date}</PublishedDate></p>
                                                            <BlogImage src={favorite.image} alt={favorite.title}/>
                                                            <p className='description'>Description: {favorite.description}</p>
                                                            <p>Category: {favorite.category}</p>
                                                            {/* <button>Remove</button> */}
                                                        </AllBlog>
                                                    )
    }

    return(
        <div>
            {mappedFavorites}
        </div>
    )
}

export default withAuth(withCrud(Favorites))

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