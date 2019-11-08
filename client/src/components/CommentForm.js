import React, {useState,} from 'react'
import {withCrud } from '../context/CrudProvider'
import moment from 'moment'
const CommentForm = (props) => {
    const [comment, setComment] = useState({})

  

    const appendBlogId = (_id) => {
        comment.date = moment().format('MMMM Do YYYY, h:mm:ss a')
        comment.blog = _id
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        appendBlogId(props._id)
        props.createBlogComment(comment)
    }

   const handleChange = (e) => {
    const {name, value } = e.target
    setComment( comment => ({...comment, [name]: value }))
    }
    return (
        <form onSubmit={handleSubmit}>
            <textarea height='100'
            placeholder='add a comment'
            name="comment"
            value={comment.comment}
            onChange={handleChange}
             />
             <button>Submit</button>

        </form>
        
    )
}

export default withCrud(CommentForm)