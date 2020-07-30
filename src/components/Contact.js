import React, { useState } from "react";
import PropTypes from "prop-types";

const initialFormValues = {
	name: "",
	company: "",
	jobtitle: "",
	email: "",
	phone: "",
	newsletter: true,
	contactme: false,
	chapter: false,
};

const encode = (data) => {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
		.join("&");
};

const Contact = ({ chapter, speak }) => {
	const handleOnChange = (inputItem, value) => {
		let tempFormValues = { ...formValues };
		tempFormValues[inputItem] = value;
		tempFormValues.chapter = chapter;
		setFormValues(tempFormValues);
	};

	const handleSubmit = (e, formValues) => {
		e.preventDefault();
		const form = e.target;
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({
				"form-name": form.getAttribute("name"),
				...formValues,
			}),
		})
			.then(() => setFormValues(initialFormValues))
			// .then(() => navigate(form.getAttribute("action")))
			.catch((error) => alert(error));
	};

	const [formValues, setFormValues] = useState(initialFormValues);

	return (
		<div className="contact">
			<form
				data-netlify="true"
				netlify-honeypot="bot-field"
				method="post"
				name="contact"
				onSubmit={(e) => handleSubmit(e, formValues)}
			>
				<input type="hidden" name="bot-field" />
				<input type="hidden" name="form-name" value="sri-contact" />
				<input type="hidden" name="chapter" value={chapter} />

				<h2>
					{speak
						? "Speak to one of our experts"
						: chapter
						? "Get a free chapter now"
						: "Get Updates into your inbox"}
				</h2>

				<div>
					<input
						id="name"
						name="name"
						onChange={(e) => handleOnChange("name", e.target.value)}
						placeholder="Name"
						required
						type="text"
						value={formValues.name}
					/>
				</div>

				<div>
					<input
						id="company"
						name="company"
						placeholder="Company"
						onChange={(e) => handleOnChange("company", e.target.value)}
						type="text"
						value={formValues.company}
					/>
				</div>

				<div>
					<input
						id="jobtitle"
						name="jobtitle"
						onChange={(e) => handleOnChange("jobtitle", e.target.value)}
						placeholder="Job Title"
						type="text"
						value={formValues.jobtitle}
					/>
				</div>

				<div>
					<input
						id="email"
						name="email"
						onChange={(e) => handleOnChange("email", e.target.value)}
						placeholder="Email"
						required
						type="email"
						value={formValues.email}
					/>
				</div>

				<div>
					<input
						id="phone"
						name="phone"
						onChange={(e) => handleOnChange("phone", e.target.value)}
						placeholder="Phone"
						required
						type="tel"
						value={formValues.phone}
					/>
				</div>

				<div>
					<label className="checkbox-container">
						Receive our Weekly Newsletter
						<input
							id="newsletter"
							defaultChecked
							name="newsletter"
							onChange={(e) => handleOnChange("newsletter", e.target.checked)}
							type="checkbox"
							// {formValues.newsletter ? 'checked' : null}
						/>
						<span className="checkmark"></span>
					</label>
				</div>

				<div>
					<label className="checkbox-container">
						Speak with one of our experts
						<input
							id="contactme"
							name="contactme"
							onChange={(e) => handleOnChange("contactme", e.target.checked)}
							type="checkbox"
							// {formValues.speak ? 'checked' : null}
						/>
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
