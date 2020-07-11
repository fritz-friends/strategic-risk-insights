import React from "react";
import PropTypes from "prop-types";
import Parser from "html-react-parser";

const FeatureGrid = ({ gridItems }) => (
	<div className="columns is-multiline">
		{gridItems.map((item) => (
			<div key={item.text}>
				<section className="serviceBlurb">
					<h2>{item.title}</h2>
					<p>{Parser(item.text)}</p>
				</section>
			</div>
		))}
	</div>
);

FeatureGrid.propTypes = {
	gridItems: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
			text: PropTypes.string,
		})
	),
};

export default FeatureGrid;
