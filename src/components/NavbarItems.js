import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const NavbarItems = ({ className }) => {
	return (
		<>
			<Link className={className} to="/services" activeClassName="current-page">
				Services
			</Link>
			<Link className={className} to="/cases" activeClassName="current-page">
				Cases
			</Link>
			<Link className={className} to="/blog" activeClassName="current-page">
				Blog
			</Link>
			<Link className={className} to="/podcast" activeClassName="current-page">
				Podcast
			</Link>
			<Link className={className} to="/book" activeClassName="current-page">
				Book
			</Link>
			<Link className={className} to="/about" activeClassName="current-page">
				About
			</Link>
		</>
	);
};

NavbarItems.propTypes = {
	className: PropTypes.string,
};

export default NavbarItems;
