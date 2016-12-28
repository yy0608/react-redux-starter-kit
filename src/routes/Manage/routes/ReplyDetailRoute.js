import React from 'react'

const ReplyDetailRoute = React.createClass({
  render () {
    return (
      <div>
        <div>ReplyDetailRoute</div>
      </div>
    )
  }
})

export default (store) => ({
  path : 'reply_detail',
  /*  Async getComponent is only invoked when route matches   */
  component: ReplyDetailRoute
})
