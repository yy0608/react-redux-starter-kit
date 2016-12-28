import React from 'react'
import { IndexLink, Link } from 'react-router'

const FirstTabs = React.createClass({
  render () {
    return (
      <div className='first-tabs'>
        <IndexLink to='manage/post_detail' activeClassName='route--active'>帖子详情</IndexLink>
        <Link to='manage/reply_detail' activeClassName='route--active'>帖子详情</Link>
        <Link to='manage/user_detail' activeClassName='route--active'>人员详情</Link>
      </div>
    )
  }
})

export default FirstTabs
