import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { UserContextProvider } from "./UserContext";
import FashionGpt from "./pages/FashionGpt";

function App() {
  return (

		<UserContextProvider>
			<Routes>
				<Route index element = {
					<div className="container" >
						<Home />
					</div>
				} />

				<Route path={"/fashionGpt"} element = {
					<div className="container" >
						<FashionGpt></FashionGpt>
					</div>
				} />
			</Routes>
		</UserContextProvider>
  );
}

export default App;
