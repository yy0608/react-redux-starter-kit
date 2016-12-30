import React from 'react'
import $ from 'jquery'
import API from '../../../utils/api'

const GroupBtns = React.createClass({

  componentDidMount () {
    this.setState({
      startTime: new Date()
    })
  },

  changeGroup (e) {
    var topic_id = this.props.topicId
    var title = this.props.title
    var _this = e.target
    var status = _this.getAttribute('value')
    var operation_time = parseInt((+new Date() - this.state.startTime)/1000)
    var args = { topic_id: topic_id, title: title, status: status, operation_time: operation_time }
    $.post(API.host + '/snapper_filter/v1/topic/check', args, (res) => {
      if (res.success) {
        this.props.callbackParent()
      }
    })
  },

  render () {
    var groupsTypes = [
      {
        status: 9,
        name: "求祝福水贴"
      },
      {
        status: 11,
        name: "其他无意义水贴"
      },
      {
        status: 8,
        name: "负面、消极信息"
      },
      {
        status: 6,
        name: "广告或垃圾信息"
      },
      {
        status: 7,
        name: "色情淫秽、低俗"
      },
      {
        status: 12,
        name: "辱骂、人身攻击"
      },
      {
        status: 13,
        name: "竞品相关或诋毁小恩爱"
      },
      {
        status: 10,
        name: "其他原因"
      }
    ]
    return (
      <div className='handle-btns'>
        {
          groupsTypes.map ((g, i) => {
            return <button className='push-into' key={i} value={g.status} onClick={this.changeGroup}>{g.name}</button>
          })
        }
      </div>
    )
  }
})

export default GroupBtns
