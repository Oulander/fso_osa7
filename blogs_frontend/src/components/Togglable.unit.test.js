import React from 'react'
import { shallow } from 'enzyme'
import Togglable from './Togglable'

describe('Check if <Togglable> content performs as expected', () => {
  let togglableComponent

  beforeEach(() => {
    togglableComponent = shallow(
      <Togglable showButtonLabel="show" hideButtonLabel="hide">
        <div className="testDiv" />
      </Togglable>
    )
  })

  it('renders its children', () => {
    expect(togglableComponent.contains(<div className="testDiv" />)).toEqual(true)
  })

  it('doesn\'t show children at start', () => {
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: 'none'})
  })

  it('shows children after a click', () => {
    const button = togglableComponent.find('button')
    button.at(0).simulate('click')

    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: ''})

  })
})
