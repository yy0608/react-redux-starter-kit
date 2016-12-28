import React from 'react'
import $ from 'jquery'
import { Link, browserHistory } from 'react-router'
import API from '../../../utils/api'

const ForbiddenView = React.createClass({
  render () {
    return (
      <div className='content-container'>
        <div className='first-tabs'>
          <Link to='/banuser/unhandle_record' activeClassName='route--active'>未处理</Link>
          <Link to='/banuser/handled_record' activeClassName='route--active'>已处理</Link>
          <Link to='/banuser/banuser_record' activeClassName='route--active'>禁用纪录</Link>
        </div>
        {this.props.children}
      </div>
    )
  }
})

export default ForbiddenView