import React from "react";
import { Link } from "gatsby";

export const Pages = ({ currentPage, numberOfPages, path }) => {
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
	console.log("pages path :>> ", path);
	return pages.map((pageNumber) => (
		<Link
			to={pageNumber > 0 ? `/${path}/${pageNumber + 1}` : `/${path}/`}
			className="btn btn-pagination btn-pagination--number"
			key={pageNumber}
		>
			{pageNumber + 1}
		</Link>
	));
};
const Pager = ({ currentPage, numberOfPages, path }) => {
	console.log("path :>> ", path);
	if (numberOfPages > 1) {
		return (
			<div className="pagination">
				<Link
					to={`/${path}/${
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

				<Pages
					currentPage={currentPage}
					numberOfPages={numberOfPages}
					path={path}
				/>

				<Link
					to={`/${path}/${
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
	} else {
		return null;
	}
};

export default Pager;
