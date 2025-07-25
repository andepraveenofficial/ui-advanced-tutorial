import React, { useState } from "react";

let count: number = 0;
const LoginForm: React.FC = () => {
	const [formData, setFormData] = useState<{
		username: string;
		email: string;
		password: string;
	}>({ username: "", email: "", password: "" });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted", formData);
  };
  
  

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>Login Form</h1>
				<div>
					<input
						type='text'
						placeholder='Enter Username'
						value={formData.username}
						onChange={(e) =>
							setFormData({ ...formData, username: e.target.value })
						}
					/>
				</div>

				<div>
					<input
						type='email'
						placeholder='Enter Email'
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
					/>
				</div>

				<div>
					<input
						type='password'
						placeholder='Enter Password'
						value={formData.password}
						onChange={(e) =>
							setFormData({ ...formData, password: e.target.value })
						}
					/>
				</div>
				<br />
				<button type='submit'>Login</button>
			</form>
			<div>
				<h2>Form Data:</h2>
				<pre>{JSON.stringify(formData, null, 2)}</pre>
			</div>
			<div>
				<h2>Count: {count++}</h2>
			</div>
		</div>
	);
};

export default LoginForm;
