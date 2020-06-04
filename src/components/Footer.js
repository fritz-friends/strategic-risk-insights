import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer>
        <div>
          <img
            src={logo}
            alt="Kaldi"
            style={{ width: '14em', height: '10em' }}
          />
        </div>
        <section>
          <ul>
            <li>
              <Link to="/">
                Home
                      </Link>
            </li>
            <li>
              <Link to="/about">
                About
                      </Link>
            </li>
            <li>
              <Link to="/products">
                Products
                      </Link>
            </li>
            <li>
              <Link to="/contact/examples">
                Form Examples
                      </Link>
            </li>
            <li>
              <a
                href="/admin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin
                      </a>
            </li>
          </ul>
        </section>
        <section>
          <ul>
            <li>
              <Link to="/blog">
                Latest Stories
                      </Link>
            </li>
            <li>
              <Link to="/contact">
                Contact
                      </Link>
            </li>
          </ul>
        </section>
      </footer>
    )
  }
}

export default Footer
