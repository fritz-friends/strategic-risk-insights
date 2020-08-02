import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Login from "./Login";

const NavbarItems = ({ className }) => {
	return (
		<>
			<Link
				className={className + " btn btn-nav"}
				to="/services"
				activeClassName="current-page"
			>
				Services
			</Link>
			<Link
				className={className + " btn btn-nav"}
				to="/cases"
				activeClassName="current-page"
			>
				Cases
			</Link>
			<Link
				className={className + " btn btn-nav"}
				to="/blog"
				activeClassName="current-page"
			>
				Blog
			</Link>
			<Link
				className={className + " btn btn-nav"}
				to="/podcast"
				activeClassName="current-page"
			>
				Podcast
			</Link>
			<Link
				className={className + " btn btn-nav"}
				to="/book"
				activeClassName="current-page"
			>
				Book
			</Link>
			<Link
				className={className + " btn btn-nav"}
				to="/about"
				activeClassName="current-page"
			>
				About
			</Link>
			<Login className={className} />
		</>
	);
};

NavbarItems.propTypes = {
	className: PropTypes.string,
};

export default NavbarItems;
