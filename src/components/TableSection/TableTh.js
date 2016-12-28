import React from 'react'

const TableTh = React.createClass({
  render () {
    return (
      <tr>
        {this.props.titleArr.map((title, i) => {
          return (
            <th key={i}>{title}</th>
          )
        })}
      </tr>
    )
  }
})

export default TableTh
