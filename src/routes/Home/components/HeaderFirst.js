import React from 'react'
import $ from 'jquery'
import { IndexLink, Link } from 'react-router'
import API from '../../../utils/api.js'

const HeaderFirst = React.createClass({

  getInitialState () {
    return {
      reply_count: 0,
      topic_count: 0
    }
  },

  changeClick () {
    this.titleInitState()
  },

  titleInitState () {
    $.get(API.host + '/snapper_filter/v1/topic/count', (res) => {
      var data = res.data
      if (this.isMounted) {
        this.setState({
          topic_count: data.topic_count,
          reply_count: data.reply_count
        })
      }
    })
  },

  componentWillMount () {
    this.titleInitState()
  },

  render () {
    return (
      <div className='first-tabs' ref='headerWrapper' onClick={this.changeClick} id='headWrapper'>
        <Link to='/check/post' className='nav-a' activeClassName='route--active'>
          帖子({this.state.topic_count})
        </Link>
        <Link to='/check/reply' className='nav-a' activeClassName='route--active'>
          回复({this.state.reply_count})
        </Link>
        <Link to='/check/list' className='nav-a' activeClassName='route--active'>
          审核记录
        </Link>
      </div>
    )
  }
})

export default HeaderFirst
