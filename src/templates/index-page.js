import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import ReactPlayer from "react-player/lazy";

import BlogRoll from "../components/BlogRoll";
import Contact from "../components/Contact";
import Features from "../components/Features";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
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
			<div id="video">
				<ReactPlayer url={videoSourceURL} width="814px" height="458px" />
			</div>
		</section>

		{/* services */}
		<section className="service-blurbs">
			<Features gridItems={intro.blurbs} />
			<Link to="/services" className="btn btn-reversed btn-large">
				See Our Services
			</Link>
		</section>

		{/* Latest Content */}
		<section className="blogroll--home">
			<h1>Latest stories</h1>
			<BlogRoll />
		</section>

		<Contact />

		{/* Track Record */}
		<section className="trackrecord--home">
			<h1>{trackrecord.heading}</h1>
			<TrackRecordSlider testimonials={trackrecord.testimonials} />
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
