import StatisticView from './components/Statistic'

export default (store) => ({
  path : 'statistic',
  /*  Async getComponent is only invoked when route matches   */
  component: StatisticView
})
