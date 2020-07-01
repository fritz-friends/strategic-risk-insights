import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Contact from "../components/Contact";

export const BlogPostTemplate = ({ content, contentComponent, title }) => {
	const PostContent = contentComponent || Content;
	return (
		<div className="blog-post-wrapper">
			<section className="subpage-masthead">
				<Link className="btn btn-nav btn-nav--secondary" to="/blog">
					Back to Blog
				</Link>
				{helmet || ""}
				<h1>{title}</h1>
			</section>
			<section className="blog-post content-copy">
				<p>{description}</p>
				<PostContent content={content} />
				{tags && tags.length ? (
					<div className="tags">
						<h4>Tags</h4>
						<ul className="tag-list">
							{tags.map((tag) => (
								<li key={tag + `tag`}>
									<Link to={`/tags/${kebabCase(tag)}/`} className="btn btn-tag">
										{tag}
									</Link>
								</li>
							))}
						</ul>
					</div>
				) : null}
			</section>
		</div>
	);
};

BlogPostTemplate.propTypes = {
	content: PropTypes.node.isRequired,
	contentComponent: PropTypes.func,
	description: PropTypes.string,
	title: PropTypes.string,
	helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
	const { markdownRemark: post } = data;

	return (
		<Layout>
			<BlogPostTemplate
				content={post.html}
				contentComponent={HTMLContent}
				description={post.frontmatter.description}
				helmet={
					<Helmet titleTemplate="%s | Blog">
						<title>{`${post.frontmatter.title}`}</title>
						<meta
							name="description"
							content={`${post.frontmatter.description}`}
						/>
					</Helmet>
				}
				tags={post.frontmatter.tags}
				title={post.frontmatter.title}
			/>
		</Layout>
	);
};

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
};

export default BlogPost;

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				tags
			}
		}
	}
`;
