import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import BlogRollForIndex from "../components/BlogRollForIndex";
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TrackRecordSlider from "../components/TrackRecordSlider";

export const IndexPageTemplate = ({
	title,
	videoSourceURL,
	thumbnail,
	thirdParadigm,
	thirdParadigmDescription,
	trackrecord,
}) => (
	<div>
		<SEO
			title={title}
			description={thirdParadigmDescription}
			image="/img/website/3rd-paradigm-illustration.svg"
		/>
		{/* Introduction */}
		<section className="intro">
			<h1>{title}</h1>
			{/* eslint-disable-next-line*/}
			<video className="video" poster={thumbnail.publicURL} controls>
				<source src={videoSourceURL.publicURL} type="video/mp4" />
			</video>
		</section>

		{/* 3rd Paradigm */}
		<section className="service-3rdParadigm">
			<img
				src="/img/3rd-paradigm-illustration.svg"
				alt="The 3rd Paradigm"
				className="paradigm-illustration"
			/>
			<h2>{thirdParadigm}</h2>
			<p>{thirdParadigmDescription}</p>
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
	videoSourceURL: PropTypes.object,
	thumbnail: PropTypes.object,
	title: PropTypes.string,
	thirdParadigm: PropTypes.string,
	thirdParadigmDescription: PropTypes.string,
	trackrecord: PropTypes.object,
};

const IndexPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark;
	return (
		<Layout>
			<IndexPageTemplate
				videoSourceURL={frontmatter.videoSourceURL}
				thumbnail={frontmatter.thumbnail}
				title={frontmatter.title}
				thirdParadigm={frontmatter.thirdParadigm}
				thirdParadigmDescription={frontmatter.thirdParadigmDescription}
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
				thumbnail {
					publicURL
				}
				videoTitle
				heading
				thirdParadigm
				thirdParadigmDescription
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
