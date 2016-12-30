import React from 'react'
import $ from 'jquery'
import API from '../../../utils/api'

const GroupBtns = React.createClass({
  changeGroup (e) {
    var topic_id = this.props.topicId
    var _this = e.target
    var group_id = _this.getAttribute('value')
    var args = { topic_id: topic_id, group_id: group_id }
    $.post(API.host + '/snapper_filter/v1/topic/change_topic_group', args, (res) => {
      if (res.success) {
        this.props.callbackParent()
      }
    })
  },

  render () {
    var groupsTypes = [
      {
        id: 2,
        name: "晒恩爱"
      },
      {
        id: 3,
        name: "我们的故事"
      },
      {
        id: 4,
        name: "爱情碎碎念"
      },
      {
        id: 5,
        name: "小恩爱粉丝圈"
      }
    ]
    return (
      <div className='handle-btns'>
        {
          groupsTypes.map ((g, i) => {
            return <button className='pass-group' key={i} value={g.id} onClick={this.changeGroup}>{g.name}</button>
          })
        }
      </div>
    )
  }
})

export default GroupBtns
