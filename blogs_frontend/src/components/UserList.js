/* eslint react/display-name: 0 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

const UserList = (props) => {

  const data = props.users.map(user => {
    return(
      {
        key: user.id,
        username: user.username,
        name: user.name,
        adult: user.adult ? 'Yes' : 'No',
        blogAmount: user.blogs.length
      }
    )
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <Link to={`/users/${record.key}`}>{text}</Link>,
      sorter: (a, b) => {
        if (a.name > b.name) return 1
        else if (a.name < b.name) return -1
        else return 0
      }
    }, {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => {
        if (a.username > b.username) return 1
        else if (a.username < b.username) return -1
        else return 0
      }
    }, {
      title: 'Adult',
      dataIndex: 'adult',
      sorter: (a, b) => {
        if (a.adult > b.adult) return 1
        else if (a.adult < b.adult) return -1
        else return 0
      }
    }, {
      title: 'Blogs',
      dataIndex: 'blogAmount',
      sorter: (a, b) => a.blogAmount - b.blogAmount
    }]

  return (
    <Table columns={columns} dataSource={data}/>
  )
}



UserList.propTypes = {
  users: PropTypes.array.isRequired
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)
