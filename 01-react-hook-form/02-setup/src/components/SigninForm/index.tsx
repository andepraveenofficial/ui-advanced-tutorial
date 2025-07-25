import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

let count: number = 0;

type FormFieldTypes = {
	username: string;
	email: string;
	password: string;
};

const SigninForm: React.FC = () => {
	/*
  1. register : this function is used to store the input values in the form state.
  2. handleSubmit : this function is used to handle the form submission.
  3. handleSubmit validates the form data and calls the onSubmit function if the data is valid.
  */
	const { register, handleSubmit, formState, setError } =
		useForm<FormFieldTypes>();

	const { errors, isSubmitting } = formState;
	console.log(errors);

	const onSubmit: SubmitHandler<FormFieldTypes> = async (
		data: FormFieldTypes
	) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			console.log("Form submitted", data);
			throw new Error("Error");
		} catch (error) {
			console.log(error);
			setError("root", {
				message: "This is a custom error message from catch block",
			});
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Signin Form with React Hook Form</h1>
				<div>
					<input
						type='text'
						placeholder='Enter Username'
						{...register("username", {
							required: true, // Example: make this field required
							minLength: {
								value: 3,
								message: "Username must be at least 3 characters long",
							}, // Example: minimum length of 3 characters
							maxLength: {
								value: 6,
								message: "Username must be at most 6 characters long",
							},
						})}
					/>
					<div>
						{errors.username && (
							<span style={{ color: "red" }}>{errors.username.message}</span>
						)}
					</div>
				</div>

				<div>
					<input
						type='email'
						placeholder='Enter Email'
						{...register("email")} // this input field stores the value with the name "email"
					/>
				</div>

				<div>
					<input
						type='password'
						placeholder='Enter Password'
						{...register("password")}
					/>
				</div>
				<br />

				{/*loading : taking time of onSubmit function execution */}
				<button type='submit' disabled={isSubmitting}>
					{isSubmitting ? "Signing in..." : "Signin"}
				</button>
				<div>
					{errors.root && (
						<span style={{ color: "red" }}>{errors.root.message}</span>
					)}
				</div>
			</form>

			<div>
				<h2>Form Data:</h2>
				<pre>{JSON.stringify("formData", null, 2)}</pre>
			</div>
			<div>
				<h2>Count: {count++}</h2>
			</div>
		</div>
	);
};

export default SigninForm;
