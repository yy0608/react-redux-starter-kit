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

  componentWillMount () {
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

  render () {
    return (
      <div className='first-tabs'>
        <IndexLink to='/post' className='nav-a' activeClassName='route--active'>
          帖子({this.state.topic_count})
        </IndexLink>
        <Link to='/reply' className='nav-a' activeClassName='route--active'>
          回复({this.state.reply_count})
        </Link>
      </div>
    )
  }
})

export default HeaderFirst
