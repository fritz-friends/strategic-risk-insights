import React from "react";
import { Link } from "gatsby";

const Pager = ({ pageContext }) => {
	const { previousPagePath, nextPagePath, numberOfPages } = pageContext;
	const pages = Array.from({ length: numberOfPages }, () => []);
	console.log("pageContext :>> ", pageContext);
	console.log("pages :>> ", pages);
	return (
		<div>
			{previousPagePath && <Link to={previousPagePath}>Previous</Link>}
			{pages.map((page, index) => {
				return (
					<Link to={index > 0 ? `blog/${index + 1}` : "blog/"}>
						{index + 1}
					</Link>
				);
			})}
			{nextPagePath && <Link to={nextPagePath}>Next</Link>}
		</div>
	);
};

export default Pager;
