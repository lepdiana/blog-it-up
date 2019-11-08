import React, { useState } from 'react';
import axios from 'axios'
import { withAuth, blogPostAxios } from '../context/AuthProvider.js'
import { withCrud } from '../context/CrudProvider.js'


const EditBlog = (props) => {
  const [edits, setEdits] = useState({})
  const {_id} = props.post
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.toggler()

    props.sendEdits(_id, edits)
  }

  
  const handleChange = (e) => {
    const {name, value} = e.target
      setEdits(edits => ({...edits, [name]: value}))
  }

  
  return (
    <div>
          <form onSubmit={handleSubmit}>
            <input placeholder="Title"
                name='title'
                value={edits.title}
                onChange={handleChange}
                />
          
            <input placeholder="Image"
            name='image'
            value={edits.image}
            onChange={handleChange} />
            <textarea height='100' placeholder="Description"
            name='description'
            value={edits.description}
            onChange={handleChange} />
            <input placeholder="Category"
            name='category'
            value={edits.category}
            onChange={handleChange}/>
            <button>Publish</button>
            </form>
    </div>
  );
};

export default withAuth(withCrud(EditBlog))