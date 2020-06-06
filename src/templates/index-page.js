import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const IndexPageTemplate = ({
  image,
  title,
  intro,
  trackrecord,
}) => (
    <div>
      {/* Introduction */}
      <section>
        <div
          className="full-width-image margin-top-0"
          style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
              })`,
            backgroundPosition: `top left`,
            backgroundAttachment: `fixed`,
          }}
        >
          <div>
            <h1>
              {title}
            </h1>
          </div>
        </div>
        <Features gridItems={intro.blurbs} />
      </section>

      {/* Latest Content */}
      <section>
        <h3>Latest stories</h3>
        <BlogRoll />
        <Link to="/blog">
          Read more
        </Link>
      </section>

      {/* Track Record */}
      <section>
        <div>
          <PreviewCompatibleImage imageInfo={trackrecord[0]} />
          <h2>{trackrecord[0].heading}</h2>
          <p>{trackrecord[0].description}</p>
        </div>
      </section>
    </div>
  )

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  trackrecord: PropTypes.array,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  console.log('frontmatter.trackrecord :>> ', frontmatter.trackrecord);
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        intro={frontmatter.intro}
        trackrecord={frontmatter.trackrecord}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: {templateKey: {eq: "index-page"}, trackrecord: {elemMatch: {description: {}}}}) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          id
        }
        heading
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
              id
            }
            title
            text
          }
        }
        trackrecord {
          image {
            childImageSharp {
              fluid(maxWidth: 240, quality: 64){
                ...GatsbyImageSharpFluid
              }
            }
            id
          }
          heading
          description
        }
      }
    }
  }
`
