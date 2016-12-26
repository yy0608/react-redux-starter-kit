import ManageView from './components/Manage'

export default (store) => ({
  path : 'manage',
  /*  Async getComponent is only invoked when route matches   */
  component: ManageView
})
