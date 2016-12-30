import React from 'react'
import $ from 'jquery'
import API from '../../../utils/api'
import Layer from '../../../utils/_layer'
import HeaderFirst from './HeaderFirst'
import EmptyTip from '../../../components/EmptyTip'
import GroupBtns from './GroupBtns'
import CheckBtns from './CheckBtns'
import PassBtns from './PassBtns'

const PostView = React.createClass ({

  getInitialState () {
    return {
      list: {},
      imgsUrlArr: []
    }
  },

  selfInitState (options = '') {
    //获取帖子详情
    $.get(API.host+'/snapper_filter/v1/topic/list' + options, (res) => {
      var list = res.data.list[0]
      if (res.success && this.isMounted) {
        if (list) {
          if (list.ext_info) {
            this.setState({
              imgsUrlArr: JSON.parse(res.data.list[0].ext_info).image_urls
            })
          }
          this.setState({
            list: res.data.list
          })
        }
      }
    })
  },

  componentWillMount () {
    var topic_id = this.props.location.query.user_id
    var optionsUrl = topic_id ? `?topic_id=${topic_id}` : ''
    this.selfInitState(optionsUrl)
  },

  onChildChanged () { // 转移小组之后重新获取新帖子
    this.selfInitState()
    $('#headWrapper').trigger('click')
    Layer.alert('操作成功!')
  },

  render () {
    var list = this.state.list
    if (!list.length) {
      return (
        <EmptyTip />
      )
    } else {
      return (
        <div>
          <div className='check-content'>
            <div className='post-info'>
              <p className='title'>帖子标题：{list[0].title}</p>
              <p className='info'>
                <a href='#' className='group'>帖子小组：{list[0].group_name}</a>
                <span className='id'>帖子 ID : <i className='num'>{list[0].topic_id}</i></span>
              </p>
            </div>
            <div className='person-info'>
              <span className='head'>
                <img src={list[0].avatar_url} />
              </span>
              <div className='guy-info'>
                <span className='nickname'>发帖人：{list[0].nick_name}</span>
                <span className='time'>发帖时间：{list[0].created_at}</span>
              </div>
            </div>
          </div>
          <div className='handle-content'>
            <h2>不通过审核操作</h2>
            <CheckBtns topicId={list[0].topic_id} title={list[0].title} callbackParent={this.onChildChanged} />
          </div>
          <PassBtns topicId={list[0].topic_id} replyId={list[0].reply_id} userId={list[0].user_id} nickName={list[0].nick_name} callbackParent={this.onChildChanged} />
          <div className='handle-content'>
            <h2>转移小组</h2>
            <GroupBtns topicId={list[0].topic_id} callbackParent={this.onChildChanged} />
          </div>
          <div className='main-content'>
            <p className='text'>帖子内容：{list[0].content}</p>
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
        </div>
      )
    }
  }
})

export default PostView
