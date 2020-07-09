module.exports = {
	siteMetadata: {
		title: "Strategic Risk Insights",
		description: "We put the strategy in strategic risk management.",
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sass",
		{
			// keep as first gatsby-source-filesystem plugin for gatsby image support
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/static/img`,
				name: "uploads",
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/pages`,
				name: "pages",
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/img`,
				name: "images",
			},
		},
		"gatsby-plugin-sharp",
		// {
		// 	resolve: `gatsby-plugin-podcast-feed-mdx`,
		// 	options: {
		// 		title: `Podcast Title`,
		// 		subtitle: `A pithy tagline`,
		// 		description: `Podcast description`,
		// 		summary: `Podcast summary`,
		// 		podcastType: `episodic`,
		// 		siteUrl: `https://podcast.com`,
		// 		imageUrl: `https://podcast.com/podcast-image/png`,
		// 		feedUrl: `https://podcast.com/pocast-rss-feed.xml`,
		// 		language: `en-au`,
		// 		copyright: `Copyright © 2020 Strategic Risk Insights`,
		// 		authorName: `Streg`,
		// 		ownerName: `The Owner`,
		// 		ownerEmail: `owner@podcast.com`,
		// 		managingEditor: `editor@podcast.com`,
		// 		webMaster: `support@podcast.com`,
		// 		explicit: `no`,
		// 		publicationDate: `Jan 25, 2020 10:00:00 GMT`,
		// 		category1: `Arts`,
		// 		subCategory1: `Books`,
		// 		category2: `Education`,
		// 		subCategory2: `Courses`,
		// 		category3: `Business`,
		// 		subCategory3: `Marketing`,
		// 		timeToLive: `60`,
		// 		outputPath: `/podcast-rss-feed.xml`,
		// 	},
		// },
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: "gatsby-remark-relative-images",
						options: {
							name: "uploads",
						},
					},
					{
						resolve: "gatsby-remark-images",
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 2048,
						},
					},
					{
						resolve: "gatsby-remark-copy-linked-files",
						options: {
							destinationDir: "static",
						},
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-netlify-cms",
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`,
			},
		},
		{
			resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
			options: {
				develop: true, // Activates purging in npm run develop
				purgeOnly: ["/all.sass"], // applies purging only on the bulma css file
			},
		}, // must be after other CSS plugins
		"gatsby-plugin-netlify", // make sure to keep it last in the array
	],
};
