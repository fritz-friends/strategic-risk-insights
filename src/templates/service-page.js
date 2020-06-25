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
		<div className="services-container">
			<div className="services">
				{intro.services.map((service, i) => {
					return (
						<div className="service" key={i}>
							<h2>{service.service}</h2>
							<p>{service.text}</p>
						</div>
					);
				})}
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
				<p>{highlightedservice.description}</p>
				<ul>
					{highlightedservice.bullets.map((bullet, i) => {
						return bullet ? <li key={i}>{bullet.bullet}</li> : null;
					})}
				</ul>
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
