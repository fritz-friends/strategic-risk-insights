import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Contact from "../components/Contact";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const CasesTemplate = ({ markup }) => {
	const { title, cases } = markup.frontmatter;

	return (
		<div>
			<section className="subpage-masthead">
				<h1>{title}</h1>
			</section>

			<section className="cases-container">
				{cases.map((study, i) => (
					<div className="case-study-container">
						<div className="case-logo" key={i}>
							<PreviewCompatibleImage imageInfo={study.logo} />
						</div>
						<h2>{study.case}</h2>
						<p>{study.description}</p>
						<div className="btn-wrapper">
							<Link className="btn btn-small" to="/cases">
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
	title: PropTypes.string.isRequired,
	cases: PropTypes.array,
};

const CasesPage = ({ data }) => {
	const { markdownRemark: frontmatter } = data;

	return (
		<Layout>
			<CasesTemplate markup={frontmatter} />
		</Layout>
	);
};

CasesPage.propTypes = {
	data: PropTypes.object.isRequired,
};

export default CasesPage;

export const CasesPageQuery = graphql`
	query CasesPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				cases {
					case
					logo {
						childImageSharp {
							fluid(maxWidth: 240, quality: 64) {
								...GatsbyImageSharpFluid
							}
						}
						id
					}
					description
				}
			}
		}
	}
`;
