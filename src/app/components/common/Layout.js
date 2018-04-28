import React from 'react'

import Header from './Header'
import Navigation from '../navigation/components/Navigation'
import Shortcut from '../navigation/components/Shortcut'

import LayoutSwitcher from '../layout/components/LayoutSwitcher'


// require('../../smartadmin/components/less/components.less');

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <div id="main" role="main">
          <LayoutSwitcher />
          {this.props.children}
        </div>
        <Shortcut />
      </div>
    )
  }
}

