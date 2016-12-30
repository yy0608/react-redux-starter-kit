import React from 'react'
import $ from 'jquery'
import API from '../../../utils/api'
import GroupBtns from './GroupBtns'
import CheckBtns from './CheckBtns'
import Layer from '../../../utils/_layer'

const PassBtns = React.createClass({

  addToForbidden () { // 加入封禁名单
    var args = {
      topic_id: this.props.topicId,
      reply_id: this.props.replyId,
      user_id: this.props.userId,
      nick_name: this.props.nickName
    }
    $.post(API.host+'/snapper_filter/v1/ban/add_to_list', args, (res) => {
      if (res.success) {
        this.props.callbackParent()
      }
    })
  },

  goPass () {
    this.props.callbackParent()
  },

  render () {
    return (
      <div className='handle-content'>
        <h2>是否加入封禁名单</h2>
        <div className='handle-btns'>
          <button className='push-into' onClick={this.addToForbidden}>是否加入封禁名单</button>
          <button className='pass' onClick={this.goPass}>通过</button>
        </div>
      </div>
    )
  }
})

export default PassBtns
