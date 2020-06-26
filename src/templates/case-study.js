import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Contact from "../components/Contact";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const CasesTemplate = ({ content, contentComponent, logo, title }) => {
	const PostContent = contentComponent || Content;
	return (
		<div>
			<section className="subpage-masthead">
				<h1>{title}</h1>
			</section>
			<section>
				<PreviewCompatibleImage imageInfo={logo} />
				<PostContent content={content} />
			</section>
			<section className="contact-section">
				<Contact />
			</section>
		</div>
	);
};

CasesTemplate.propTypes = {
	content: PropTypes.node.isRequired,
	contentComponent: PropTypes.func,
	description: PropTypes.string,
	title: PropTypes.string.isRequired,
};

const CaseStudy = ({ data }) => {
	const { markdownRemark: study } = data;
	return (
		<Layout>
			<CasesTemplate
				content={study.html}
				contentComponent={HTMLContent}
				description={study.frontmatter.description}
				logo={study.frontmatter.logo}
				title={study.frontmatter.title}
			/>
		</Layout>
	);
};

CaseStudy.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
};

export default CaseStudy;

export const pageQuery = graphql`
	query CaseStudyByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				title
				logo {
					childImageSharp {
						fluid(maxWidth: 2048, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`;
