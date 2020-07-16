import React from "react";
import PropTypes from "prop-types";
import { PodcastTemplate } from "../../templates/podcast";

const PodcastPreview = ({ entry, widgetFor }) => {
	return (
		<PodcastTemplate
			content={widgetFor("body")}
			description={entry.getIn(["data", "description"])}
			title={entry.getIn(["data", "title"])}
			audioSourceURL={entry.getIn(["data", "audioSourceURL"])}
		/>
	);
};

PodcastPreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
};

export default PodcastPreview;
