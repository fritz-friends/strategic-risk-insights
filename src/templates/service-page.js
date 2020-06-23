import React from "react";
import PropTypes from "prop-types";
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
		<div>
			{intro.services.map((service, i) => {
				return (
					<div key={i}>
					<h2>{service.service}</h2>
					<p>{service.text}</p>
					</div>
				);
			})}
			<PreviewCompatibleImage imageInfo={image} />
		</div>
		{/* highlighted service */}
		<section>
			<h1>{highlightedservice.heading}</h1>
			<p>{highlightedservice.description}</p>
			<ul>
				{highlightedservice.bullets.map((bullet, i) => {
					return bullet ? <li key={i}>{bullet.bullet}</li> : null;
				})}
			</ul>
		</section>

		{/* customers */}
		<section>
			<h1>{customers.heading}</h1>
			{customers.logos.map((logo, i) => (
				<div className="services-customers" key={i}>
					<PreviewCompatibleImage imageInfo={logo.logo} />
				</div>
			))}
		</section>

		<section className="contact-section">
			<Contact />
		</section>
	</div>
);

ServicePageTemplate.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	intro: PropTypes.shape({
		blurbs: PropTypes.array,
	}),
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
					services {
						service
						text
					}
				}
				highlightedservice {
					heading
					description
					bullets {
						bullet
					}
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
