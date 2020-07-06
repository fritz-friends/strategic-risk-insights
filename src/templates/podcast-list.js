import React from "react";

import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import CastRoll from "../components/CastRoll";
import Contact from "../components/Contact";
import Pager from "../components/Pager";

export default class PodcastList extends React.Component {
	render() {
		const { data, pageContext } = this.props;
		return (
			<Layout>
				<section className="subpage-masthead">
					<h1>Podcasts</h1>
				</section>

				<section className="blog-index-wrapper">
					<CastRoll data={data} />
				</section>
				<Pager
					currentPage={pageContext.currentPodcastPage}
					numberOfPages={pageContext.numberOfPodcastPages}
					path="podcast"
				/>
				<section className="contact-section">
					<Contact />
				</section>
			</Layout>
		);
	}
}

export const podcastListQuery = graphql`
	query podcastListQuery($castsSkip: Int, $castsLimit: Int) {
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { templateKey: { eq: "podcast" } } }
			skip: $castsSkip
			limit: $castsLimit
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
`;
