import React from "react";
import PropTypes from "prop-types";
import Checkbox from "rc-checkbox";

const Contact = ({ chapter, speak }) => {
	return (
		<div className="contact">
			<form
				method="post"
				netlify-honeypot="bot-field"
				data-netlify="true"
				name="contact"
			>
				<input type="hidden" name="bot-field" />
				<input type="hidden" name="sri-contact" value="contact" />

				<h2>
					{speak
						? "Speak to one of our experts"
						: chapter
						? "Get a free chapter now"
						: "Get Updates into your inbox"}
				</h2>

				<div>
					<input
						type="text"
						name="name"
						placeholder="Name"
						id="name"
						required
					/>
				</div>

				<div>
					<input
						type="text"
						name="company"
						placeholder="Company"
						id="company"
					/>
				</div>

				<div>
					<input
						type="text"
						name="jobtitle"
						placeholder="Job Title"
						id="jobtitle"
					/>
				</div>

				<div>
					<input
						type="email"
						name="email"
						placeholder="Email"
						id="email"
						required
					/>
				</div>

				<div>
					<label>
						<Checkbox defaultChecked className="checkbox" />
						Receive our Quarterly Newsletter
					</label>
				</div>

				<div>
					<label>
						<Checkbox className="checkbox" />
						Speak with one of our experts
					</label>
				</div>

				<div className="contact button">
					<button className="btn-large btn-reversed" type="submit">
						Subscribe
					</button>
				</div>
			</form>
		</div>
	);
};

Contact.propTypes = {
	chapter: PropTypes.bool,
	speak: PropTypes.bool,
};

Contact.defaultProps = {
	chapter: false,
	speak: false,
};

export default Contact;
