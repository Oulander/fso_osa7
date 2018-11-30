import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const blog = {
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

describe.skip('<SimpleBlog />', () => {


  const onClick = jest.fn()

  it('renders content', () => {

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick}/>)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.likes)
  })

  it('handles clicks correctly', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick}/>)
    const buttonElement = blogComponent.find('.button')

    buttonElement.simulate('click')
    buttonElement.simulate('click')

    expect(onClick.mock.calls.length).toBe(2)
  })

})
