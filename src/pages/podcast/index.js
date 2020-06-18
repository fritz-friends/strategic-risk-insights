import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class PodcastIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <h1>
          Latest Podcasts
          </h1>
        <section>
          <BlogRoll />
        </section>
      </Layout>
    )
  }
}
