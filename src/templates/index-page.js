import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import BlogRollForIndex from "../components/BlogRollForIndex";
import Contact from "../components/Contact";
import Features from "../components/Features";
import Layout from "../components/Layout";
import TrackRecordSlider from "../components/TrackRecordSlider";

export const IndexPageTemplate = ({
	title,
	videoSourceURL,
	intro,
	trackrecord,
}) => (
	<div>
		{/* Introduction */}
		<section className="intro">
			<h1>{title}</h1>
			<video className="video" controls>
				<source src={videoSourceURL.publicURL} type="video/mp4" />
			</video>
		</section>

		{/* services */}
		<section className="service-blurbs">
			<img
				src="/img/3rd-paradigm-illustration.svg"
				alt="The 3rd Paradigm"
				className="paradigm-illustration"
			/>
			<Features gridItems={intro.blurbs} />
			<Link to="/services" className="btn btn-reversed btn-large">
				See Our Services
			</Link>
		</section>

		{/* Latest Content */}
		<section className="blogroll--home">
			<h2 className="heading-1">Latest stories</h2>
			<BlogRollForIndex />
		</section>

		<section className="contact-section">
			<Contact />
		</section>

		{/* Track Record */}
		<section className="trackrecord--home">
			<h2 className="heading-1">{trackrecord.heading}</h2>
			<TrackRecordSlider testimonials={trackrecord.testimonials} />
			<div className="util--centered-wrapper">
				<Link to="/cases" className="btn btn-large">
					Read Our Case Studies
				</Link>
			</div>
		</section>
	</div>
);

IndexPageTemplate.propTypes = {
	videoSourceURL: PropTypes.string,
	title: PropTypes.string,
	intro: PropTypes.shape({
		blurbs: PropTypes.array,
	}),
	trackrecord: PropTypes.array,
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
			frontmatter: PropTypes.object,
		}),
	}),
};

export default IndexPage;

export const pageQuery = graphql`
	query IndexPageTemplate {
		markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
			frontmatter {
				title
				videoSourceURL {
					publicURL
				}
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
					heading
					testimonials {
						image {
							childImageSharp {
								fluid(maxWidth: 240, quality: 64) {
									...GatsbyImageSharpFluid
								}
							}
							id
						}
						testimonial
						testifier
					}
				}
			}
		}
	}
`;
