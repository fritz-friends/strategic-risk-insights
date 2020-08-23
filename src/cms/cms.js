import React from "react";
import CMS from "netlify-cms-app";
// import uploadcare from "netlify-cms-media-library-uploadcare";
// import cloudinary from "netlify-cms-media-library-cloudinary";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import BookPreview from "./preview-templates/BookPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import PodcastPreview from "./preview-templates/PodcastPreview";
import ServicePagePreview from "./preview-templates/ServicePagePreview";

// CMS.registerMediaLibrary(uploadcare);
// CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("services", ServicePagePreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);
CMS.registerPreviewTemplate("podcast", PodcastPreview);
CMS.registerPreviewTemplate("book", BookPreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);

const video = {
	label: "Video",
	id: "video",
	fromBlock: (match) =>
		match && {
			video: match[2],
			alt: match[1],
		},
	toBlock: ({ alt, video }) => `![${alt || ""}](${video || ""})`,
	// eslint-disable-next-line react/display-name
	toPreview: ({ alt, video }, getAsset, fields) => {
		console.log("Are we making it here?");
		const videoField = fields?.find((f) => f.get("name") === "video");
		console.log("videoField :>> ", videoField);
		const src = getAsset(video, videoField);
		console.log("src :>> ", src);
		// return (
		// 	<>
		// 		<video poster={src || ""} controls alt={alt || ""}>
		// 			<source src={src || ""} type="video/mp4" />
		// 		</video>
		// 	</>
		// );
		return <p>Hello There</p>;
	},
	pattern: /^!\[(.*)\]\((.*?)(\s"(.*)")?\)$/,
	fields: [
		{
			label: "Video",
			name: "video",
			widget: "file",
			media_library: {
				allow_multiple: false,
			},
		},
		{
			label: "Alt Text",
			name: "alt",
		},
	],
};

CMS.registerEditorComponent(video);
