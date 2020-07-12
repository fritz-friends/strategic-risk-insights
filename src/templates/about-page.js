import React from "react";
import PropTypes from "prop-types";
import Parser from "html-react-parser";
import { graphql } from "gatsby";
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const AboutPageTemplate = ({ description, principals, title }) => {
	return (
		<div>
			<section className="subpage-masthead">
				<h1>{title}</h1>
			</section>
			<section>{Parser(description)}</section>
			<section>
				{principals.map((principal) => (
					<div>
						<PreviewCompatibleImage
							imageInfo={principal.photo}
							className="about-picture"
						/>
						{principal.principal}
						{Parser(principal.text)}
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
	console.log("data :>> ", data);
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
