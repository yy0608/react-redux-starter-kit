import React from 'react'

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
                <td>{li.add_time}</td>
                <td>{li.checker_name}</td>
                <td>{li.status}</td>
                <td>{li.nickname}</td>
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
