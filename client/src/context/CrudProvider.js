import React, { Component } from 'react'
import axios from 'axios'
import { withAuth, blogPostAxios } from './AuthProvider.js'

const { Provider, Consumer } = React.createContext()

class CrudProvider extends Component {
    constructor() {
        super()
        this.state = {
            blogPosts: [],
            favoriteBlogPosts: []
        }
    }

    getBlogPosts = () => {
        blogPostAxios.get('/blog/')
        .then( res => { 
            const data = res.data.reverse()
            this.setState(prev => ({
                blogPosts: [...data]
            })) 
        })
        .catch(err => console.log(err)) 
        
    }

    deleteBlogPost = (_id) => {
        blogPostAxios.delete(`/api/blog/${_id}`)
        
        this.setState(prev => {
            const filteredArray = prev.blogPosts.filter( blog => {
                return _id !== blog._id
            })
            return {blogPosts: filteredArray}
        })
    }

    sendEdits = (_id, edits) => {
        blogPostAxios.put(`/api/blog/${_id}`, edits)
        .then(res => {
            this.setState( prev => ({
                blogPosts: prev.blogPosts.map( blog => blog._id === _id ? res.data : blog)
            }))
        })
        .catch(err => console.log(err))
    }

    // get request to current user's favorites
    getFavoriteBlogPosts = (userId) => {
        blogPostAxios.get(`/auth/${userId}/favorites`)
        .then(res => {
            this.setState(prev => ({
                favoriteBlogPosts:  res.data
                }))
        })
        .catch(err => console.log(err))
    }

    // post request to current user's favorites to save current blog post's ID
    putFavoriteBlogPosts = ( userId, post) => {
        blogPostAxios.put(`/auth/${userId}/favorites`, { favorites: post._id })
            .then(res => { console.log(res.data)
                // this.setState(prev => {
                //     const filterDuplicates = new Set ([...prev.favoriteBlogPosts, post])
                //     const backToArr = [...filterDuplicates]
                //     return {favoriteBlogPosts: [...backToArr]}
                // })
            })
            .catch(err => console.log(err))
    }
//start of comment CRUD *******************************
createBlogComment = (arg) => {
    blogPostAxios.post('/api/comment', arg)

    
}

    render() {
        return(
            <div>
                <Provider 
                    value={{
                        blogPosts: this.state.blogPosts,
                        getBlogPosts: this.getBlogPosts,
                        deleteBlogPost: this.deleteBlogPost,
                        createBlogComment:this.createBlogComment,
                        sendEdits: this.sendEdits,
                        favoriteBlogPosts: this.state.favoriteBlogPosts,
                        getFavoriteBlogPosts: this.getFavoriteBlogPosts,
                        putFavoriteBlogPosts: this.putFavoriteBlogPosts
                    
                    }}>

                { this.props.children }
                </Provider>
            </div>
        )
    }
}

export const withCrud = C => props => (
    <Consumer>
        { value => <C { ...value } { ...props  }/>}
    </Consumer>
)

export default withAuth(CrudProvider)