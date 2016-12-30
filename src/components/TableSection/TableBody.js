import React from 'react'
import { browserHistory } from 'react-router'
import STATUS from '../../utils/status'

const TableThead = React.createClass({
  translateHtmlCharater (html) {
      var div = document.createElement("div")
      div.innerHTML = html
      return div.textContent
  },

  goDetail (e) {
    var value = e.target.dataset
    var topic_id = value.topic_id
    var reply_id = value.reply_id
    var topic_type = value.topic_type
    var routeUrl = `/banuser/detail?topic_id=${topic_id}&reply_id=${reply_id}&topic_type=${topic_type}`
    console.log(routeUrl)
    browserHistory.push(routeUrl)
  },

  render () {
    var list = this.props.list

    return (
      <tbody>
        {
          list.map((li, i) => {
            return (
              <tr key={i}>
                <td>{li.topic_id}</td>
                <td>{li.check_time}</td>
                <td dangerouslySetInnerHTML={{__html: this.translateHtmlCharater(li.title || li.content)}}></td>
                <td>{STATUS[li.status-1]}</td>
                <td>{li.checker_name}</td>
                <td>
                  <button className='see-detail' data-topic_id={li.topic_id} data-reply_id={li.reply_id} data-topic_type={li.topic_type} onClick={this.goDetail}>查看详情</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    )
  }
})

export default TableThead
