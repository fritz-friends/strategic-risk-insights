import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";
import Contact from "../../components/Contact";
import PreviewCompatibleImage from "../../components/PreviewCompatibleImage";

export const CasesTemplate = ({ studies }) => {
	console.log("studies :>> ", studies);
	return (
		<div>
			<section className="subpage-masthead">
				<h1>Case Studies</h1>
			</section>

			<section className="cases-container">
				{studies.map(({ node: study }, i) => (
					<div className="case-study-container" key={i}>
						<div className="case-logo">
							<PreviewCompatibleImage imageInfo={study.frontmatter.logo} />
						</div>
						<h2>{study.frontmatter.title}</h2>
						<p>{study.frontmatter.description}</p>
						<div className="btn-wrapper">
							<Link className="btn btn-small" to={study.fields.slug}>
								Read Case Study
							</Link>
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

CasesTemplate.propTypes = {
	studies: PropTypes.array,
};

const CasesPage = ({ data }) => {
	const { edges: studies } = data.allMarkdownRemark;

	return (
		<Layout>
			<CasesTemplate studies={studies} />
		</Layout>
	);
};

CasesPage.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
};

export default CasesPage;

export const CasesPageQuery = graphql`
	query CasesPageQuery {
		allMarkdownRemark(
			sort: { order: ASC, fields: [frontmatter___order] }
			filter: { frontmatter: { templateKey: { eq: "case-study" } } }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						title
						templateKey
						order
						featuredpost
						logo {
							childImageSharp {
								fluid(maxWidth: 120, quality: 100) {
									...GatsbyImageSharpFluid
								}
							}
						}
						description
					}
				}
			}
		}
	}
`;
