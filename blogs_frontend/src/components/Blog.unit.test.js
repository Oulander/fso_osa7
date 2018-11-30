import React from 'react'
import { mount } from 'enzyme'
import Blog from './Blog'
import Togglable from './Togglable'


describe('<Togglable>...', () => {
  let togglableComponent

  beforeEach(() => {

    const blogContent = {
      author: 'Robert C. Martin',
      id: '5bf6ffd5cfc1c61fbd9e1330',
      likes: 7,
      title: 'Type wars',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      user: {
        _id: '5bf6ffd4cfc1c61fbd9e1329',
        name: 'marja',
        username: 'user1'
      }
    }

    const handleLike = jest.fn()
    const handleDelete = jest.fn()
    const showDeleteButton = true
    const blog = <Blog
      className='testBlog'
      blog={blogContent}
      handleLike={handleLike}
      handleDelete={handleDelete}
      showDeleteButton={showDeleteButton}/>

    togglableComponent = mount(
      <Togglable showButtonLabel="show" hideButtonLabel="hide">
        {blog}
      </Togglable>
    )

  })

  it('renders the <Blog>', () => {
    expect(togglableComponent.exists('.testBlog')).toEqual(true)
  })

  it('doesn\'t show the togglable <Blog> content at start', () => {
    const div = togglableComponent.find('.blogToggledContent')
    expect(div.getElement().props.style).toEqual({ display: 'none'})
  })

  it('shows the togglable <Blog> content after a click', () => {
    const blogWrapper = togglableComponent.find('.blog')

    blogWrapper.simulate('click')

    const div = togglableComponent.find('.blogToggledContent')
    expect(div.getElement().props.style).toEqual({ display: ''})

  })
})
