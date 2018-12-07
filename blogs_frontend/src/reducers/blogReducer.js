import blogService from '../services/blogs'


const blogReducer = (store = [], action) => {
  switch(action.type){

  case 'UPDATE_BLOG': {
    const oldList = store.filter(blog => blog.id !== action.updatedBlog.id)
    return [...oldList, action.updatedBlog ]
  }

  case 'ADD_BLOG': {
    return [...store, action.blog]
  }

  case 'INIT_BLOGS':{
    return action.blogs
  }

  case 'DELETE_BLOG':{
    const updatedList = store.filter(blog => blog.id !== action.id)
    return updatedList
  }

  default:
    return store
  }
}

export const castLike = (blog) => {
  return async (dispatch) => {
    const id = blog.id

    const updated = {
      ...blog,
      likes: blog.likes + 1
    }

    const response = await blogService.update(id, updated)

    dispatch({
      type: 'UPDATE_BLOG',
      updatedBlog: { ...response, liked:true }
    })
  }
}


export const addBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      blog: response
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs: blogs
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      id: blog.id
    })
  }
}

export default blogReducer
