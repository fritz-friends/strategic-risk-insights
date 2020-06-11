import React from 'react'
import { Link } from 'gatsby';
import NavbarItems from './NavbarItems';

import logo from '../img/logo.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div>
          <Link
            activeClassName="current-page"
            className="navbar-item-bottom"
            to="/">
            Home
          </Link>
          <NavbarItems className="navbar-item-bottom" />
        </div>
        <div>
          &copy; 2020 Strategic Risk Insights. All Rights Reserved.
        </div>
      </footer>
    )
  }
}

export default Footer
