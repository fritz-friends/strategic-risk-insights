import React from "react";
import PropTypes from "prop-types";
import PodcastList from "../../templates/podcast";

const PodcastListPreview = ({ entry, widgetFor }) => {
	const tags = entry.getIn(["data", "tags"]);
	return (
		<PodcastList
			content={widgetFor("body")}
			description={entry.getIn(["data", "description"])}
			tags={tags && tags.toJS()}
			title={entry.getIn(["data", "title"])}
		/>
	);
};

PodcastListPreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
};

export default PodcastListPreview;
