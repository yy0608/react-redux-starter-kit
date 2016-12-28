import React from 'react'
import { Link } from 'react-router'

const FirstTabs = React.createClass({
  render () {
    return (
      <div className='first-tabs'>
        <Link to='/manage/post_detail' activeClassName='route--active'>帖子详情</Link>
        <Link to='/manage/reply_detail' activeClassName='route--active'>回复详情</Link>
        <Link to='/manage/user_detail' activeClassName='route--active'>人员详情</Link>
      </div>
    )
  }
})

export default FirstTabs
