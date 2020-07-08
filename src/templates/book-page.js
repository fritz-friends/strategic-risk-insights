import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Contact from "../components/Contact";

export const BookTemplate = ({ markup }) => {
	const {
		title,
		firstReview,
		firstReviewer,
		secondReview,
		secondReviewer,
		description,
	} = markup.frontmatter;

	return (
		<div>
			<section className="subpage-masthead">
				<h1>{title}</h1>
			</section>

			<section className="book-frontmatter">
				<div class="book-reviews-wrapper">
					<div className="book-cover">
						<PreviewCompatibleImage imageInfo={markup.frontmatter} />
					</div>
					<div className="book-reviews">
						<div className="book-review">
							<p>{firstReview}</p>
							<p className="reviewer">{firstReviewer}</p>
						</div>
						<div className="book-review">
							<p>{secondReview}</p>
							<p className="reviewer">{secondReviewer}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Buy Now */}
			<section></section>

			{/* Description */}
			<section>{description}</section>
			<section className="contact-section">
				<Contact chapter />
			</section>
		</div>
	);
};

BookTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	contentComponent: PropTypes.func,
};

const BookPage = ({ data }) => {
	const { markdownRemark: frontmatter } = data;

	return (
		<Layout>
			<BookTemplate markup={frontmatter} />
		</Layout>
	);
};

BookPage.propTypes = {
	data: PropTypes.object.isRequired,
};

export default BookPage;

export const BookPageQuery = graphql`
	query BookPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				firstReview
				firstReviewer
				secondReview
				secondReviewer
				image {
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
`;
