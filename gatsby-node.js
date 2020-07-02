const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;

	return graphql(`
		{
			allMarkdownRemark(limit: 1000) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							tags
							templateKey
						}
					}
				}
			}
		}
	`).then((result) => {
		if (result.errors) {
			result.errors.forEach((e) => console.error(e.toString()));
			return Promise.reject(result.errors);
		}

		const posts = result.data.allMarkdownRemark.edges;
		let blogPostCount = 0;
		let podcastCount = 0;
		posts.forEach((edge) => {
			const id = edge.node.id;

			edge.node.frontmatter.templateKey === "blog-post"
				? blogPostCount++
				: null;
			edge.node.frontmatter.templateKey === "podcast" ? podcastCount++ : null;

			createPage({
				path: edge.node.fields.slug,
				tags: edge.node.frontmatter.tags,
				component: path.resolve(
					`src/templates/${String(edge.node.frontmatter.templateKey)}.js`
				),
				// additional data can be passed via context
				context: {
					id,
				},
			});
		});

		// Create blog roll list pages
		const postsPerPage = 2;
		const numberOfBlogPages = Math.ceil(blogPostCount / postsPerPage);
		Array.from({ length: numberOfBlogPages }).forEach((_, i) => {
			createPage({
				path: i === 0 ? `/blog` : `/blog/${i + 1}`,
				component: path.resolve("./src/templates/blog-list.js"),
				context: {
					blogLimit: postsPerPage,
					blogSkip: i * postsPerPage,
					numberOfBlogPages,
					currentBlogPage: i + 1,
				},
			});
		});

		// Create podcast list pages
		const castsPerPage = 2;
		const numberOfPodcastPages = Math.ceil(podcastCount / castsPerPage);
		Array.from({ length: numberOfPodcastPages }).forEach((_, i) => {
			createPage({
				path: i === 0 ? `/podcast` : `/podcast/${i + 1}`,
				component: path.resolve("./src/templates/podcast.js"),
				context: {
					castsLimit: castsPerPage,
					castsSkip: i * castsPerPage,
					numberOfPodcastPages,
					currentPodcastPage: i + 1,
				},
			});
		});

		// Tag pages:
		// let tags = [];
		// Iterate through each post, putting all found tags into `tags`
		// posts.forEach((edge) => {
		// 	if (_.get(edge, `node.frontmatter.tags`)) {
		// 		tags = tags.concat(edge.node.frontmatter.tags);
		// 	}
		// });
		// Eliminate duplicate tags
		// tags = _.uniq(tags);

		// Make tag pages
		// tags.forEach((tag) => {
		// 	const tagPath = `/tags/${_.kebabCase(tag)}/`;

		// 	createPage({
		// 		path: tagPath,
		// 		component: path.resolve(`src/templates/tags.js`),
		// 		context: {
		// 			tag,
		// 		},
		// 	});
		// });
	});
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	fmImagesToRelative(node); // convert image paths for gatsby images

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value,
		});
	}
};
