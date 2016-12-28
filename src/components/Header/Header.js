import React from 'react'
import { IndexLink, Link } from 'react-router'

const Header = React.createClass({
  render(){
    return (
      <div className='menu-container' style={{height:window.document.documentElement.clientHeight}}>
        <div className='tc logo'>
          <span className='img'></span>
          <span className='text'>情侣说审核后台</span>
        </div>
        <div className="nav-wrapper">
          <div className='handle'>操作</div>
          <IndexLink to='/' className='nav-a' activeClassName='route--active'>
            <span className='nav-span'><i className='icon-map'></i>审核</span>
          </IndexLink>
          <Link to='/manage' className='nav-a' activeClassName='route--active'>
            <span className='nav-span'><i className='icon-cog'></i>管理</span>
          </Link>
          <Link to='/statistic' className='nav-a' activeClassName='route--active'>
            <span className='nav-span'><i className='icon-stats-dots'></i>统计</span>
          </Link>
          <Link to='/forbidden' className='nav-a' activeClassName='route--active'>
            <span className='nav-span'><i className='icon-user-minus'></i>用户封禁</span>
            </Link>
        </div>
        <div className="user-wrapper">
          <span className='user'>Welcome,xxx</span>
          <a className='exit' href>
            <i className='icon-exit'></i>
          </a>
        </div>
      </div>
    )
  }
})

export default Header
