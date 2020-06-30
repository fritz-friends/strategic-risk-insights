import React from "react";
import { Link } from "gatsby";

export const Pages = ({ currentPage, numberOfPages }) => {
	const maxPageNumbers = 3;
	let start = 0;

	if (currentPage <= maxPageNumbers) {
		start = 0;
	} else if (numberOfPages - currentPage + 1 < maxPageNumbers) {
		start = numberOfPages - currentPage - 1;
	} else {
		start = currentPage;
	}

	const length =
		numberOfPages <= maxPageNumbers ? numberOfPages : maxPageNumbers;

	const pages = Array.from({ length: length }, (_, i) => start + i);
	console.log("pages :>> ", pages);
	return pages.map((pageNumber) => (
		<Link to={pageNumber > 0 ? `blog/${pageNumber + 1}` : "blog/"} className="btn btn-pagination btn-pagination--number">
			{pageNumber + 1}
		</Link>
	));
};
const Pager = ({ pageContext }) => {
	const { currentPage, numberOfPages } = pageContext;
	console.log("currentPage :>> ", currentPage);
	return (
		<div className="pagination">
			<Link
				to={`blog/${
					currentPage > 1
						? currentPage - 1 > 1
							? currentPage - 1
							: ""
						: numberOfPages
				}`}
				className="btn btn-pagination btn-pagination--text"
			>
				Previous
			</Link>

			<Pages currentPage={currentPage} numberOfPages={numberOfPages} />

			<Link
				to={`blog/${
					currentPage < numberOfPages
						? currentPage + 1 > 1
							? currentPage + 1
							: ""
						: ""
				}`}
				className="btn btn-pagination btn-pagination--text"
			>
				Next
			</Link>
		</div>
	);
};

export default Pager;
