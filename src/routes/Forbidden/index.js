import ForbiddenView from './components/forbidden'

export default (store) => ({
  path : 'forbidden',
  /*  Async getComponent is only invoked when route matches   */
  component: ForbiddenView
})
