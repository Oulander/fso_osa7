import React from 'react'
import PropTypes from 'prop-types'

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
        <button onClick={ this.toggleVisibility }>{this.props.showButtonLabel}</button>
      </div>
      <div style = {cssWhenContentShown} className="togglableContent">
        <button onClick={ this.toggleVisibility }>{this.props.hideButtonLabel}</button>
        { this.props.children }
      </div>
    </div>
  )}

}
