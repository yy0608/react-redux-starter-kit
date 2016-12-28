import React from 'react'
import { IndexLink, Link } from 'react-router'

const FirstTabs = React.createClass({
  render () {
    return (
      <div className='first-tabs'>
        <a href='#' className='route-active'>帖子详情</a>
        <a href='#'>回复详情</a>
        <a href='#'>人员详情</a>
      </div>
    )
  }
})

export default FirstTabs
