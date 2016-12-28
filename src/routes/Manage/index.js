import ManageView from './components/Manage'
import PostDetailRoute from './routes/PostDetailRoute'
import ReplyDetailRoute from './routes/ReplyDetailRoute'
import UserDetailRoute from './routes/UserDetailRoute'

export default (store) => ({
  path : 'manage',
  /*  Async getComponent is only invoked when route matches   */
  component: ManageView,
  indexRoute: PostDetailRoute,
  childRoutes: [
    PostDetailRoute(),
    ReplyDetailRoute(),
    UserDetailRoute()
  ]
})
