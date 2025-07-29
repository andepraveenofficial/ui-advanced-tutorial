import React from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools"; // Importing Devtool for debugging

let count: number = 0;

type FormFieldTypes = {
	username: string;
	email: string;
	anotherEmail: string;
	password: string;
};

const schema = z.object({
	username: z.string().min(3).max(6),
	email: z.email(),
	anotherEmail: z.email(),
	password: z.string().min(6),
});

const SigninForm: React.FC = () => {
	/*
  1. register : this function is used to store the input values in the form state.
  2. handleSubmit : this function is used to handle the form submission.
  3. handleSubmit validates the form data and calls the onSubmit function if the data is valid.
  */
	const { register, handleSubmit, formState, setError, control } =
		useForm<FormFieldTypes>({
			defaultValues: {
				username: "",
				email: "",
				anotherEmail: "",
				password: "",
			},
			resolver: zodResolver(schema),
		});

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
						{...register("username")}
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
					<div>
						{errors.email && (
							<span style={{ color: "red" }}>{errors.email.message}</span>
						)}
					</div>
				</div>

				<Controller
					control={control}
					name='anotherEmail'
					render={({ field }) => {
						return (
							<div>
								<input
									type='email'
									placeholder='Enter Email'
									{...field}
									value={field.value}
									onChange={field.onChange}
								/>
								<div>
									{errors.anotherEmail && (
										<span style={{ color: "red" }}>
											{errors.anotherEmail.message}
										</span>
									)}
								</div>
							</div>
						);
					}}
				/>

				<div>
					<input
						type='password'
						placeholder='Enter Password'
						{...register("password")}
					/>
					<div>
						{errors.password && (
							<span style={{ color: "red" }}>{errors.password.message}</span>
						)}
					</div>
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

			{/* DevTool is used to debug the form state 
			It shows the form state in the console 
		 It is useful for debugging the form state
		 It is not required for the form to work */}
			<DevTool control={control} />

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
