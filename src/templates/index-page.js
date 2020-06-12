import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import ReactPlayer from "react-player/lazy";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const IndexPageTemplate = ({ title, videoSourceURL, intro, trackrecord }) => (
  <div>
    {/* Introduction */}
    <section className="intro">
      <h1>{title}</h1>
      <div id="video">
        <ReactPlayer url={videoSourceURL} />
      </div>

    </section>

    {/* services */}
    <section className="service-blurbs">
      <Features gridItems={intro.blurbs} />
      <Link to="/services" className="btn btn-reversed btn-large">See Our Services</Link>
    </section>
    {/* Latest Content */}
    <section>
      <h3>Latest stories</h3>
      <BlogRoll />
      <Link to="/blog">Read more</Link>
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
);

IndexPageTemplate.propTypes = {
  videoSourceURL: PropTypes.string,
  title: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  trackrecord: PropTypes.array
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <IndexPageTemplate
        videoSourceURL={frontmatter.videoSourceURL}
        title={frontmatter.title}
        intro={frontmatter.intro}
        trackrecord={frontmatter.trackrecord}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(
      frontmatter: {
        templateKey: { eq: "index-page" }
        trackrecord: { elemMatch: { description: {} } }
      }
    ) {
      frontmatter {
        title
        videoSourceURL
        videoTitle
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
              fluid(maxWidth: 240, quality: 64) {
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
`;
