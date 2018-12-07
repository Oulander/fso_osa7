import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

export default class Togglable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false
    }
  }

  static propTypes = {
    showButtonLabel: PropTypes.string.isRequired,
    hideButtonLabel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

toggleVisibility = () => {
  this.setState({ visible: !this.state.visible })
}

render() {
  const cssWhenContentHidden = { display: this.state.visible ? 'none' : '' }
  const cssWhenContentShown = { display: this.state.visible ? '' : 'none' }

  return (
    <div className="togglableWrapper">
      <div style = {cssWhenContentHidden}>
        <Button onClick={ this.toggleVisibility }>{this.props.showButtonLabel}</Button>
      </div>
      <div style = {cssWhenContentShown} className="togglableContent">
        <Button onClick={ this.toggleVisibility } style = {{marginBottom: 20}}>{this.props.hideButtonLabel}</Button>
        { this.props.children }
      </div>
    </div>
  )}

}
