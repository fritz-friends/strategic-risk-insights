import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Contact from "../components/Contact";

export const PodcastTemplate = ({
	content,
	contentComponent,
	title,
	audioSourceURL,
}) => {
	const CastContent = contentComponent || Content;
	return (
		<div className="blog-post-wrapper">
			<section className="subpage-masthead">
				<Link className="btn btn-nav btn-nav--secondary" to="/podcast">
					Back to Podcasts
				</Link>
				<h1>{title}</h1>
			</section>
			<section className="audio-wrapper">
				{/* eslint-disable-next-line */}
				<audio controls src={audioSourceURL} className="audio-player">
					Your browser does not support the
					<code>audio</code> element.
				</audio>
			</section>
			<section className="blog-post content-copy">
				<CastContent content={content} />
			</section>
			<section className="contact-section">
				<Contact />
			</section>
		</div>
	);
};

PodcastTemplate.propTypes = {
	content: PropTypes.node.isRequired,
	contentComponent: PropTypes.func,
	description: PropTypes.string,
	title: PropTypes.string,
	helmet: PropTypes.object,
	audioSourceURL: PropTypes.string,
};

const Podcast = ({ data }) => {
	const { markdownRemark: post } = data;

	return (
		<Layout>
			<PodcastTemplate
				content={post.html}
				contentComponent={HTMLContent}
				description={post.frontmatter.description}
				tags={post.frontmatter.tags}
				title={post.frontmatter.title}
				audioSourceURL={post.frontmatter.audioSourceURL.publicURL}
			/>
		</Layout>
	);
};

Podcast.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
};

export default Podcast;

export const castPageQuery = graphql`
	query PodcastByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				audioSourceURL {
					publicURL
				}
			}
		}
	}
`;
