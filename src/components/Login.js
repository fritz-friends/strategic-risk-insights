import React, { useState } from "react";
import Modal from "react-overlays/Modal";

const initialFormValues = {
	email: "",
	password: "",
};

const Backdrop = React.forwardRef((props, ref) => {
	return (
		<div ref={ref} className="login-backdrop">
			{props.children}
		</div>
	);
});

const Login = ({ className }) => {
	const handleOnChange = (inputItem, value) => {
		let tempFormValues = { ...formValues };
		tempFormValues[inputItem] = value;
		setFormValues(tempFormValues);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setInvalidLogin(true);
	};

	const [formValues, setFormValues] = useState(initialFormValues);
	const [invalidLogin, setInvalidLogin] = useState(false);
	const [show, setShow] = useState(false);

	const renderBackdrop = (props) => {
		const ref = React.createRef();
		return <Backdrop {...props} ref={ref} />;
	};

	const close = () => {
		setShow(false);
		setInvalidLogin(false);
	};
	return (
		<>
			<Modal
				renderBackdrop={renderBackdrop}
				className="login-modal"
				onBackdropClick={() => {
					console.log("onBackdropClick triggered");
					setShow(false);
				}}
				onHide={close}
				show={show}
			>
				<div className="login">
					<form
						data-netlify="true"
						netlify-honeypot="bot-field"
						method="post"
						name="login"
						onSubmit={(e) => handleSubmit(e, formValues)}
					>
						<input type="hidden" name="bot-field" />

						<h2>Login</h2>

						<div>
							<input
								id="loginEmail"
								name="loginEmail"
								onChange={(e) => handleOnChange("loginEmail", e.target.value)}
								placeholder="Email"
								type="email"
								value={formValues.loginEmail}
							/>
						</div>

						<div>
							<input
								id="password"
								name="password"
								onChange={(e) => handleOnChange("password", e.target.value)}
								placeholder="Password"
								type="password"
								value={formValues.password}
							/>
						</div>

						<div>
							{invalidLogin ? <p>Invalid email or password</p> : <p>&nbsp;</p>}
						</div>

						<div className="login-button-container">
							<div>
								<button className="btn btn-small btn-reversed" onClick={close}>
									Cancel
								</button>
							</div>
							<div>
								<button className="btn btn-small" type="submit">
									Login
								</button>
							</div>
						</div>
					</form>
				</div>
			</Modal>
			<button
				className={
					className + " btn btn-nav btn-nav--secondary secondary-nav-item"
				}
				onClick={() => setShow(true)}
			>
				Client Login
			</button>
		</>
	);
};

export default Login;
