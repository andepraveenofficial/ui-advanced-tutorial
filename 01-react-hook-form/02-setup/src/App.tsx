import React from "react";
import SimpleForm from "./components/SimpleForm";
import HookForm from "./components/HookForm";
import ZodForm from "./components/ZodForm";

const App: React.FC = () => {
	return (
		<div>
			<SimpleForm />
			<hr />
			<HookForm />
			<hr />
			<ZodForm />
		</div>
	);
};

export default App;
