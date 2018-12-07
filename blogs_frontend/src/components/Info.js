import React from 'react'
import { Card } from 'antd'

const Info = () => {
  const cardstyle = {
    marginBottom: 20
  }

  return (
    <div>
      <Card title="The purpose of this app" style={cardstyle}>
        <p>
          This is a responsive single-page-app made by <a href='https://www.linkedin.com/in/oulaantere/'>Oula Antere</a> in fall 2018 for the <a href='https://fullstackopen.github.io/'>Fullstack Open course</a> by University of Helsinki.
        </p>
        <p>
          The source code can be found <a href='https://github.com/Oulander/fso_osa7'>here</a>.
        </p>
      </Card>
      <Card title="Frontend technologies used" style={cardstyle}>
        <p>
          <a href='https://reactjs.org/'>React</a> for the components
          with <a href='https://reactjs.org/docs/typechecking-with-proptypes.html'>PropTypes</a> for type checking.
        </p>
        <p>
          <a href='https://redux.js.org/'>Redux</a> (with <a href='https://github.com/reduxjs/redux-thunk'>Redux thunk</a>) for state handling.
        </p>
        <p>
          <a href='https://github.com/axios/axios'>Axios</a> for communicating with the backend via HTTP requests.
        </p>
        <p>
          <a href='https://ant.design/'>Ant design</a> for the styled components.
        </p>
      </Card>
      <Card title="Backend technologies used" style={cardstyle}>
        <p>
          <a href='https://nodejs.org/en/'>Node.js</a> as the base, with an <a href='https://expressjs.com/'>Express.js</a>-based REST API for handling the
          incoming HTTP requests.
        </p>
        <p>
          <a href='https://www.mongodb.com/'>MongoDB</a> (hosted at <a href='https://mlab.com/'>MLab</a>) to store the data.
        </p>
        <p>
          <a href='https://jwt.io/'>JSON Web Tokens</a> & <a href='https://www.npmjs.com/package/bcrypt'>Bcrypt</a> for user authentication.
        </p>
      </Card>
      <Card title="Development stuff used" style={cardstyle}>
        <p>
          <a href='https://eslint.org/'>ESLint</a> for linting.
        </p>
        <p>
          <a href='https://nodemon.io/'>Nodemon</a> for backend watching.
        </p>
        <p>
          <a href='https://www.npmjs.com/package/cross-env'>Cross-env</a> & <a href='https://www.npmjs.com/package/dotenv'>Dotenv</a> for
          development env variables
        </p>
        <p>
          <a href='https://jestjs.io/'>Jest</a>, <a href='https://www.npmjs.com/package/supertest'>Supertest</a> & <a href='https://airbnb.io/enzyme/'>Enzyme</a> for tests
        </p>
      </Card>
      <Card title="Things that could be improved...." style={cardstyle}>
        <p>
          (...though likely will not, as the course is done and I&#39;ll rather build something else.)
        </p>
        <ul>
          <li>
            Fixing the alert styling for the login page (if wrong credentials are input)
          </li>
          <li>
            Directing logout to the front page
          </li>
          <li>
            Adding commenting functionality to blogs and creating a single blog page
          </li>
          <li>
            Adding a new user registration possibility
          </li>
          <li>
            Fixing the trash can icon row spacing with narrow screens.
          </li>
        </ul>
      </Card>
    </div>
  )
}

export default Info
