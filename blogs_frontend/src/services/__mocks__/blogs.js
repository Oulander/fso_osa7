let token = null

const blogs =
[
  {
    id: '5bf6ffd5cfc1c61fbd9e132c',
    title: 'Updated Bloggy',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 16,
    user: null
  },
  {
    id: '5bf6ffd5cfc1c61fbd9e132b',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 17,
    user: {
      _id: '5bf6ffd4cfc1c61fbd9e132a',
      username: 'user2',
      name: 'mikko'
    }
  },
  {
    id: '5bf6ffd5cfc1c61fbd9e132f',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 3,
    user: {
      _id: '5bf6ffd4cfc1c61fbd9e132a',
      username: 'user2',
      name: 'mikko'
    }
  },
  {
    id: '5bf6ffd5cfc1c61fbd9e132e',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 15,
    user: {
      _id: '5bf6ffd4cfc1c61fbd9e132a',
      username: 'user2',
      name: 'mikko'
    }
  },
  {
    id: '5bf6ffd5cfc1c61fbd9e132d',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      _id: '5bf6ffd4cfc1c61fbd9e1329',
      username: 'user1',
      name: 'marja'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken, token }
