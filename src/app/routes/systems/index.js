export default {
  component: require('../../components/common/Layout').default,
  path: 'systems',
  childRoutes: [{
    path: 'branch',
    getComponent(nextState, cb) {
      System.import('./component/branch').then(m => {
        cb(null, m.default);
      })
    }
  }]
}
