import React from 'react'
import $ from 'jquery'
import { Link, browserHistory } from 'react-router'
import API from '../../../utils/api'
import EmptyTip from '../../../components/EmptyTip/EmptyTip'

const ForbiddenView = React.createClass({ // /snapper_filter/v1/forum/detail?topic_id=87&reply_id=0&topic_type=0
  getInitialState () {
    return {
      data: {}
    }
  },

  componentDidMount () {
    var optionsUrl = window.location.href.split('?')[1]

    $.get(API.host + '/snapper_filter/v1/forum/detail?' + optionsUrl, (res) => {
      if(this.isMounted && res.success) {
        if (res.data.ext_info) {
          this.setState({
            imgsUrlArr: JSON.parse(res.data.ext_info).image_urls
          })
        } else {
          this.setState({
            imgsUrlArr: []
          })
        }
        this.setState({
          data: res.data
        })
      }
    })
  },

  goCheck () {
    var topic_id = this.state.data.topic_id
    var optionsUrl = `?topic_id=${topic_id}`
    browserHistory.push('/check/post' + optionsUrl)
  },

  render () {
    var data = this.state.data
    if (!data.group_id) {
      return (
        <EmptyTip />
      )
    } else {
      return (
        <div>
          <div className='check-content'>
            <div className='post-info'>
              <p className='title'>帖子标题：{data.title}</p>
              <p className='info'>
                <a href='#' className='group'>帖子小组：{data.group_name}</a>
                <span className='id'>帖子 ID : <i className='num'>{data.topic_id}</i></span>
              </p>
            </div>
            <div className='person-info'>
              <span className='head'>
                <img src={data.avatar_url} />
              </span>
              <div className='guy-info'>
                <span className='nickname'>发帖人：{data.nick_name}</span>
                <span className='time'>发帖时间：{data.created_at}</span>
              </div>
            </div>
          </div>
          <div className='main-content'>
            <p className='text'>帖子内容：{data.content}</p>
            <ul className='imgs'>
              {
                this.state.imgsUrlArr.map((imgUrl, i) => (
                  <li key={i}>
                    <img key={i} src={imgUrl.url} />
                  </li>
                ))
              }
            </ul>
          </div>
          <div className='go-check'>
            <button onClick={this.goCheck}>重新审核</button>
          </div>
        </div>
      )
    }
  }
})

export default ForbiddenView