import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

const ZodForm: React.FC = () => {
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
		resolver: zodResolver(schema),
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
				<h1>Zod Form</h1>
				<div>
					<input
						{...register("email")}
						type='email'
						placeholder='Enter your email'
					/>
					{errors.email && (
						<p style={{ color: "red" }}>{errors.email.message}</p>
					)}
				</div>
				<div>
					<input
						{...register("password")}
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

export default ZodForm;
