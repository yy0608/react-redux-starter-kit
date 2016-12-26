import React from 'react'
import { IndexLink, Link } from 'react-router'

export const Header = () => (
  <div className='menu-container'>
    <div className='tc logo'>
      <span className='img'></span>
      <span className='text'>情侣说审核后台</span>
    </div>
    <ul className="nav-wrapper">
      <li>
        <IndexLink to='/' activeClassName='route--active'>
          <i className='icon-map2'></i>审核
        </IndexLink>
      </li>
      <li>
        <Link to='/manage' activeClassName='route--active'>
          <i className='icon-cogs'></i>管理
        </Link>
      </li>
      <li>
        <Link to='/statistic' activeClassName='route--active'>
          <i className='icon-stats-bars'></i>统计
        </Link>
      </li>
      <li>
        <Link to='/forbidden' activeClassName='route--active'>
          <i className='icon-users'></i>用户封禁
        </Link>
      </li>
    </ul>
    <div className="user-wrapper">
      <span>Welcome,xxx</span>
      <a href>退出</a>
    </div>
  </div>
)

export default Header
