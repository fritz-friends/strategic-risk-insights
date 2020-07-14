import React from "react";
import PropTypes from "prop-types";
import Parser from "html-react-parser";
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
		thirdReview,
		thirdReviewer,
		description,
	} = markup.frontmatter;

	return (
		<div>
			<section className="subpage-masthead">
				<h1>{title}</h1>
			</section>

			<section className="book-frontmatter">
				<div className="book-reviews-wrapper">
					<div className="book-cover">
						<PreviewCompatibleImage imageInfo={markup.frontmatter} />
					</div>
					<div className="book-reviews">
						<div className="book-review">
							<p>{Parser(firstReview)}</p>
							<p className="reviewer">{Parser(firstReviewer)}</p>
						</div>
						<div className="book-review">
							<p>{Parser(secondReview)}</p>
							<p className="reviewer">{Parser(secondReviewer)}</p>
						</div>
						<div className="book-review">
							<p>{Parser(thirdReview)}</p>
							<p className="reviewer">{Parser(thirdReviewer)}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Buy Now */}
			<section className="buy-now-section">
				<h2>Buy Now</h2>
			</section>

			{/* Description */}
			<section className="book-content">{Parser(description)}</section>
			<section className="contact-section">
				<Contact chapter />
			</section>
		</div>
	);
};

BookTemplate.propTypes = {
	title: PropTypes.string,
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
				thirdReview
				thirdReviewer
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
