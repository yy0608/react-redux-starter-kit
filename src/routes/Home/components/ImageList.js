import React from 'react'
import $ from 'jquery'
import API from '../../../utils/api'
import HeaderFirst from './HeaderFirst'

const HomeView = React.createClass ({
  getInitialState () {
    return {
      listInfo: {}
    }
  },

  componentDidMount: function() {
    $.get(API.host+'/snapper_filter/v1/topic/list', (res) => {
      var list = res.data.list[0], imgsUrlArr = []
      if (list.ext_info) {
        imgsUrlArr = JSON.parse(list.ext_info).image_urls
      }
      console.log(imgsUrlArr)

      if (list) {
        this.setState({
          content: list.content,
          avatar_url: list.avatar_url,
          created_at: list.created_at,
          imgsUrlArr: imgsUrlArr,
          group_id: list.group_id,
          group_name: list.group_name,
          nick_name: list.nick_name,
          title: list.title,
          topic_id: list.topic_id
        })
      }
    })
  },

  render () {
    return (
      <div className='content-container'>
        <HeaderFirst />
        <div className='check-content'>
          <div className='post-info'>
            <p className='title'>帖子标题：{this.state.title}</p>
            <p className='info'>
              <a href='#' className='group'>{this.state.group_name}</a>
              <span className='id'>ID : <i className='num'>{this.state.topic_id}</i></span>
            </p>
          </div>
          <div className='person-info'>
            <span className='head'>
              <img src={this.state.avatar_url} />
            </span>
            <div className='guy-info'>
              <span className='nickname'>发帖人：{this.state.nick_name}</span>
              <span className='time'>发帖时间：{this.state.created_at}</span>
            </div>
          </div>
        </div>
        <div className='main-content'>
          <p className='text'>{this.state.content}</p>
          <ul className='imgs'>
            <li>{this.state.imgsUrlArr}</li>
          </ul>
        </div>
      </div>
    )
  }
})

export default HomeView
