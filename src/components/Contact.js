import React from "react";
import PropTypes from "prop-types";
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
				<input
					type="hidden"
					name={chapter ? "sri-chapter" : "sri-contact"}
					value="contact"
				/>

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
					<label className="checkbox-container">
						Receive our Quarterly Newsletter
						<input type="checkbox" name="newsletter" id="newsletter" checked />
						<span class="checkmark"></span>
					</label>
				</div>

				<div>
					<label className="checkbox-container">
						Speak with one of our experts
						<input type="checkbox" name="newsletter" id="newsletter" />
						<span class="checkmark"></span>
					</label>
				</div>

				<div className="contact-button">
					<button className="btn btn-large btn-reversed" type="submit">
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
