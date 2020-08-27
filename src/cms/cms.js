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

CMS.registerEditorComponent({
	// Internal id of the component
	id: "youtube",
	// Visible label
	label: "YouTube",
	// Fields the user need to fill out when adding an instance of the component
	fields: [{ name: "id", label: "YouTube Video ID", widget: "string" }],
	// Pattern to identify a block as being an instance of this component
	// eslint-disable-next-line
	pattern: /<(.*)d\/(.*)\" f(.*)/,
	// Function to extract data elements from the regexp match
	fromBlock: function (match) {
		return {
			id: match[2],
		};
	},
	// Function to create a text block from an instance of this component
	toBlock: function (obj) {
		return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${obj.id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
	},
	// Preview output for this component. Can either be a string or a React component
	// (component gives better render performance)
	toPreview: function (obj) {
		return (
			`<img src="http://img.youtube.com/vi/${obj.id}` +
			`/hqdefault.jpg" alt="YouTube Video"/>`
		);
	},
});
