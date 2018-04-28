/**
 * Created by griga on 11/17/15.
 */

import React from 'react'

import ToggleMenu from './ToggleMenu'
export default class Header extends React.Component {
  render() {
    return <header id="header">
      <div id="logo-group">
                <span id="logo">
                    <img src="assets/img/logo.png" // place your logo here
                         alt="SmartAdmin"/>
                </span>
        {/* Note: The activity badge color changes when clicked and resets the number to 0
         Suggestion: You may want to set a flag when this happens to tick off all checked messages / notifications */}

      </div>
      <div className="pull-right"  /*pulled right: nav area*/ >


        <ToggleMenu className="btn-header pull-right"  /* collapse menu button */ />


      </div>

    </header>
  }
}
