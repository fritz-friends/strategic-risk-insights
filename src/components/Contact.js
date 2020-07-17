import React from "react";
import PropTypes from "prop-types";
// import { navigate } from "gatsby-link";

// const encode = (data) => {
// 	return Object.keys(data)
// 		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
// 		.join("&");
// };

// const handleSubmit = (e) => {
// 	e.preventDefault();
// 	const form = e.target;
// 	console.log("form :>> ", form);
// 	fetch("/", {
// 		method: "POST",
// 		headers: { "Content-Type": "application/x-www-form-urlencoded" },
// 		body: encode({
// 			"form-name": form.getAttribute("name"),
// 		}),
// 	})
// 		.then(() => console.log("Success"))
// 		.then(() => navigate(form.getAttribute("action")))
// 		.catch((error) => alert(error));
// };

const Contact = ({ chapter, speak }) => {
	return (
		<div className="contact">
			<form
				data-netlify="true"
				netlify-honeypot="bot-field"
				method="post"
				name="contact"
				// onSubmit={handleSubmit}
			>
				<input type="hidden" name="bot-field" />
				<input
					type="hidden"
					name="form-name"
					value={chapter ? "sri-chapter" : "sri-contact"}
					// onSubmit={handleSubmit}
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
						<input
							type="checkbox"
							name="newsletter"
							id="newsletter"
							defaultChecked
						/>
						<span className="checkmark"></span>
					</label>
				</div>

				<div>
					<label className="checkbox-container">
						Speak with one of our experts
						<input type="checkbox" name="newsletter" id="newsletter" />
						<span className="checkmark"></span>
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
