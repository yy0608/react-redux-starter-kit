import React from 'react'

const UserDetailRoute = React.createClass({
  render () {
    return (
      <div>
        <div>UserDetailRoute</div>
      </div>
    )
  }
})

export default (store) => ({
  path : 'user_detail',
  /*  Async getComponent is only invoked when route matches   */
  component: UserDetailRoute
})
