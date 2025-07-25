import React from "react";
import LoginForm from "./components/LoginForm";
import SigninForm from "./components/SigninForm";

const App: React.FC = () => {
	return (
		<div>
			<LoginForm />
			<hr />
			<SigninForm />
		</div>
	);
};

export default App;
