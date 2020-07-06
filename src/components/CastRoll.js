import React from "react";

import { Link } from "gatsby";

export default class CastRoll extends React.Component {
	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;
		return (
			<>
				<div className="blogroll-articles">
					<div className="util--centered-wrapper podcast-subscription">
						<Link className="btn btn-large" to="/podcast">
							Subscribe
						</Link>
					</div>
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
											Listen
										</Link>
									</p>
								</article>
							</div>
						))}
				</div>
			</>
		);
	}
}
