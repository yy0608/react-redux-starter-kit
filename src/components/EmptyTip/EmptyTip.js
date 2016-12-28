import React from 'react'

const EmptyTip = React.createClass({
  render () {
    return (
      <div className='content-container'>
        <div className='empty-tip'>暂无数据，请刷新试试</div>
      </div>
    )
  }
})

export default EmptyTip
