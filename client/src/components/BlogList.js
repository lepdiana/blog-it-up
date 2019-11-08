import React, { useEffect } from 'react'
import { withAuth } from '../context/AuthProvider.js'
import Blog from './Blog.js'
import { withCrud } from '../context/CrudProvider.js'

const BlogList = props => {
    const { blogPosts } = props

    useEffect(() => {
        props.getBlogPosts()
    }, [])
    
    return (
        <div>
            {  props.blogPosts.map(post => {
                return <Blog key={post._id} post={post} />})}
        </div>
    )
}

export default withAuth(withCrud(BlogList))