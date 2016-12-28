import React from 'react'

const TableThead = React.createClass({
  render () {
    return (
      <thead>
        <tr>
          {this.props.titleArr.map((title, i) => {
            return (
              <th key={i}>{title}</th>
            )
          })}
        </tr>
      </thead>
    )
  }
})

export default TableThead
