import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class PodcastIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="subpage-masthead">
          <h1>
          Podcast
          </h1>
        </section>
        <section className="podcast-index-wrapper">
          <BlogRoll />
        </section>
      </Layout>
    )
  }
}
