import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
	email: string;
	password: string;
};

const HookForm: React.FC = () => {
	/*
	register -> this register function handles the form fields
	handleSubmit -> this will do some work behind the scene, like prevent the default behavior
	
	*/

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<FormFields>({
		defaultValues: {
			email: "test@example.com",
		},
	});

	console.log(errors);
	// custom form handler
	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			throw new Error("Something went wrong");
			console.log("Form Data Submitted:", data);
		} catch (error) {
			console.error("An error occurred:", error);
			// setError("email", { message: "This email is already taken" });
			setError("root", { message: "This email is already taken" });
		}
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
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1>Hook Form</h1>
				<div>
					<input
						{...register("email", {
							required: "Email is required",
							validate: (value) => {
								if (!value.includes("@")) {
									return "Invalid email";
								}
								return true;
							},
						})}
						type='email'
						placeholder='Enter your email'
					/>
					{errors.email && (
						<p style={{ color: "red" }}>{errors.email.message}</p>
					)}
				</div>
				<div>
					<input
						// {...register("password", { required: true, minLength: 6 })}  // we send string error message
						{...register("password", {
							required: "Password is required",
							// minLength: 6,
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters",
							},
						})}
						type='password'
						placeholder='Enter your password'
					/>
					{errors.password && (
						<p style={{ color: "red" }}>{errors.password.message}</p>
					)}
				</div>
				<div>
					<button disabled={isSubmitting} type='submit'>
						{isSubmitting ? "Loading..." : "Submit"}
					</button>
				</div>
				{errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}
			</form>
		</div>
	);
};

export default HookForm;
