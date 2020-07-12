import React from "react";
import PropTypes from "prop-types";
import Parser from "html-react-parser";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Contact from "../components/Contact";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const ServicePageTemplate = ({
	image,
	title,
	intro,
	highlightedservice,
	customers,
}) => (
	<div className="content">
		{/* our services section */}
		<section className="subpage-masthead">
			<h1>{title}</h1>
		</section>
		<div className="services-container">
			<div className="services">
				{Parser(intro.firstText)}
				<PreviewCompatibleImage
					imageInfo={intro.image}
					className="services-picture"
				/>
				{Parser(intro.secondText)}
			</div>
			<div className="services-picture">
				<PreviewCompatibleImage
					imageInfo={image}
					className="services-picture"
				/>
			</div>
		</div>

		{/* highlighted service */}
		<section className="highlightedservice-container">
			<div className="highlightedservice">
				<h2 className="heading-1">{highlightedservice.heading}</h2>
				{Parser(highlightedservice.description)}
			</div>
		</section>

		{/* customers */}
		<section className="services-customers-container">
			<h2 className="heading-1">{customers.heading}</h2>
			<div className="services-customer-logo-container">
				{customers.logos.map((logo, i) => (
					<div className="services-customer-logo" key={i}>
						<PreviewCompatibleImage imageInfo={logo.logo} />
					</div>
				))}
			</div>
		</section>

		<section className="contact-section">
			<Contact speak />
		</section>
	</div>
);

ServicePageTemplate.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	intro: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	highlightedservice: PropTypes.shape({
		heading: PropTypes.string,
		description: PropTypes.string,
	}),
	customers: PropTypes.shape({
		heading: PropTypes.string,
		logo: PropTypes.array,
	}),
};

const ServicePage = ({ data }) => {
	const { frontmatter } = data.markdownRemark;

	return (
		<Layout>
			<ServicePageTemplate
				image={frontmatter.image}
				title={frontmatter.title}
				intro={frontmatter.intro}
				highlightedservice={frontmatter.highlightedservice}
				customers={frontmatter.customers}
			/>
		</Layout>
	);
};

ServicePage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object,
		}),
	}),
};

export default ServicePage;

export const servicePageQuery = graphql`
	query ServicePage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				image {
					childImageSharp {
						fluid(maxWidth: 2048, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				intro {
					firstText
					image {
						childImageSharp {
							fluid(maxWidth: 2048, quality: 100) {
								...GatsbyImageSharpFluid
							}
						}
					}
					secondText
				}
				highlightedservice {
					heading
					description
				}
				customers {
					heading
					logos {
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
		}
	}
`;
