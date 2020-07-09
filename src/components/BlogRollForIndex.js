import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";

class BlogRollForIndex extends React.Component {
	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;

		return (
			<div className="blogroll-articles">
				{posts &&
					posts.map(({ node: post }) => (
						<div className="blogroll-article column" key={post.id}>
							<article>
								<h2>
									<Link to={post.fields.slug}>{post.frontmatter.title}</Link>
								</h2>
								<p>
									{post.excerpt}
									<br />
									<br />
									<Link className="btn btn-small" to={post.fields.slug}>
										Read More
									</Link>
								</p>
							</article>
						</div>
					))}
			</div>
		);
	}
}

BlogRollForIndex.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
};

export default () => (
	<StaticQuery
		query={graphql`
			query BlogRollForIndexQuery {
				allMarkdownRemark(
					sort: { order: DESC, fields: [frontmatter___date] }
					filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
					limit: 2
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
								featuredpost
								featuredimage {
									childImageSharp {
										fluid(maxWidth: 120, quality: 100) {
											...GatsbyImageSharpFluid
										}
									}
								}
							}
						}
					}
				}
			}
		`}
		render={(data, count) => <BlogRollForIndex data={data} count={count} />}
	/>
);
