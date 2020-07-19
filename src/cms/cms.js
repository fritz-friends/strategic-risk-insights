import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import BookPreview from "./preview-templates/BookPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import PodcastPreview from "./preview-templates/PodcastPreview";
import ServicePagePreview from "./preview-templates/ServicePagePreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("services", ServicePagePreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);
CMS.registerPreviewTemplate("podcast", PodcastPreview);
CMS.registerPreviewTemplate("book", BookPreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
