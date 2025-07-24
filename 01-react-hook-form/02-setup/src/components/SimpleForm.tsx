import React, { useState } from "react";

const SimpleForm: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errors, setErrors] = useState<{ email: string; password: string }>({
		email: "",
		password: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setErrors({
			email: "",
			password: "",
		});

		if (!email) {
			setErrors({
				...errors,
				email: "Email is required",
			});
			return;
		}

		if (!password) {
			setErrors({
				...errors,
				password: "Password is required",
			});

			return;
		}

		console.log("Form Data Submitted:", { email, password });
	};

	return (
		<div>
			<form
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
					border: "1px solid black",
					width: "400px",
					alignItems: "center",
				}}
				onSubmit={handleSubmit}
			>
				<h1>Simple Form</h1>
				<div>
					<input
						type='email'
						placeholder='Enter your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
				</div>
				<div>
					<input
						type='password'
						placeholder='Enter your password'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					{errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
				</div>
				<div>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default SimpleForm;
