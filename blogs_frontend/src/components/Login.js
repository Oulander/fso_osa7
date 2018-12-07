import React from 'react'
import PropTypes from 'prop-types'
import {Form, Icon, Input, Button} from 'antd'

const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.userName, values.password)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <p>Use reactUser / react to log in.</p>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </FormItem>
      </Form>
    )
  }
}

NormalLoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const Login = Form.create()(NormalLoginForm)
export default Login
