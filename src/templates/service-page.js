import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
export const ServicePageTemplate = ({
  image,
  title,
  intro,
  highlightedservice,
  testimonials,
}) => (
    <div className="content">
      {/* our services section */}
      <section className="subpage-masthead">
          <h1>
            {title}
          </h1>
      </section>

      {/* highlighted service */}
      <section >

        <h3>
          {highlightedservice.heading}
        </h3>
        <p>{highlightedservice.description}</p>
        <div></div>
      </section>

      {/* customers */}
      <section>
        <Testimonials testimonials={testimonials} />
      </section>
    </div>
  )

ServicePageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  highlightedservice: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
  }),
  testimonials: PropTypes.array,
}

const ServicePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ServicePageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        intro={frontmatter.intro}
        highlightedservice={frontmatter.highlightedservice}
        testimonials={frontmatter.testimonials}
      />
    </Layout>
  )
}

ServicePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ServicePage;

export const servicePageQuery = graphql`
  query ServicePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
        highlightedservice {
          heading
          description
        }
        testimonials {
          author
          quote
        }
      }
    }
  }
`
