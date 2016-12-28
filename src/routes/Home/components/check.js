import React from 'react'
import HeaderFirst from './HeaderFirst'

const CheckView = React.createClass({
  render () {
    return (
      <div className='content-container'>
        <HeaderFirst />
        {this.props.children}
      </div>
    )
  }
})

export default CheckView
