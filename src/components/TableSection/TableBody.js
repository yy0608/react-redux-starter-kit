import React from 'react'
import STATUS from '../../utils/status'

const TableThead = React.createClass({
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
                <td>{li.title || li.content}</td>
                <td>{STATUS[li.status-1]}</td>
                <td>{li.checker_name}</td>
                <td>
                  <button id={li.topic_id}>查看详情</button>
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
