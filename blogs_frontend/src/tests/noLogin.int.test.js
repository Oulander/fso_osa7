import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from '../components/Blog'
import Login from '../components/Login'
import blogService from '../services/blogs'


describe('<App/>', () => {
  describe('(when user is not logged in)', () => {
    let app
    beforeEach(() => {
      window.localStorage.clear()
      app = mount(<App />)
    })
    it('shows only the login form', () => {
      app.update()
      const blogsFound = app.find(Blog)
      expect(blogsFound.length).toBe(0)

      const loginFound = app.find(Login)
      expect(loginFound.length).toBe(1)

    })
  })

  describe('(when user is logged in)', () => {
    let app
    beforeEach(() => {
      window.localStorage.clear()
      const user = {
        username: 'tester',
        token: '123',
        name: 'Toimiiko Homma'
      }
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      app = mount(<App />)
    })
    it('shows the list of blogs', () => {
      app.update()
      const blogsFound = app.find(Blog)
      expect(blogsFound.length).toEqual(blogService.blogs.length)
    })
  })

})
