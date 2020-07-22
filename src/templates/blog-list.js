import React from "react";

import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import Contact from "../components/Contact";
import Pager from "../components/Pager";
import SEO from "../components/SEO";

export default class BlogListPage extends React.Component {
	render() {
		const { data, pageContext } = this.props;
		return (
			<Layout>
				<SEO />
				<section className="subpage-masthead">
					<h1>Blog</h1>
				</section>

				<section className="blog-index-wrapper">
					<BlogRoll data={data} />
				</section>
				<Pager
					currentPage={pageContext.currentBlogPage}
					numberOfPages={pageContext.numberOfBlogPages}
					path="blog"
				/>
				<section className="contact-section">
					<Contact />
				</section>
			</Layout>
		);
	}
}

export const blogListPageQuery = graphql`
	query blogListPageQuery($blogSkip: Int!, $blogLimit: Int!) {
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
			skip: $blogSkip
			limit: $blogLimit
		) {
			edges {
				node {
					excerpt(pruneLength: 400)
					id
					fields {
						slug
					}
					frontmatter {
						title
						templateKey
						date(formatString: "MMMM DD, YYYY")
					}
				}
			}
		}
	}
`;
