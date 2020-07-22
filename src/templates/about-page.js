import React from "react";
import PropTypes from "prop-types";
import Parser from "html-react-parser";
import { graphql } from "gatsby";
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import SEO from "../components/SEO";

export const AboutPageTemplate = ({ description, principals, title }) => {
	return (
		<div>
			<SEO title={title} description={description} />
			<section className="subpage-masthead">
				<h1>{title}</h1>
			</section>
			<section className="about-description">{Parser(description)}</section>
			<section className="about-bios">
				{principals.map((principal, i) => (
					<div className="about-bio-container" key={i}>
						<div className="about-picture">
							<PreviewCompatibleImage imageInfo={principal.photo} />
						</div>
						<div className="about-bio-content">
							<h2>{principal.principal}</h2>
							{Parser(principal.text)}
						</div>
					</div>
				))}
			</section>
			<section className="contact-section">
				<Contact />
			</section>
		</div>
	);
};

AboutPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
	const { markdownRemark: post } = data;

	return (
		<Layout>
			<AboutPageTemplate
				description={post.frontmatter.description}
				principals={post.frontmatter.principals}
				title={post.frontmatter.title}
			/>
		</Layout>
	);
};

AboutPage.propTypes = {
	data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
	query AboutPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			html
			frontmatter {
				title
				description
				principals {
					principal
					photo {
						childImageSharp {
							fluid(maxWidth: 2048, quality: 100) {
								...GatsbyImageSharpFluid
							}
						}
					}
					text
				}
			}
		}
	}
`;
