import React from 'react'
import PropTypes from 'prop-types'
import {Form, Icon, Input, Button} from 'antd'

const FormItem = Form.Item

class BasicAddBlogForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.title, values.author, values.url)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Input missing!' }],
          })(
            <Input prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('author', {
            rules: [{ required: true, message: 'Author missing!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Author" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('url', {
            rules: [{ required: true, message: 'URL missing!' }],
          })(
            <Input prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="URL" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </FormItem>
      </Form>
    )
  }
}

BasicAddBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const AddBlogForm = Form.create()(BasicAddBlogForm)
export default AddBlogForm
