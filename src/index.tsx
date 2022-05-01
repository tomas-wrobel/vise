import "material-icons/iconfont/material-icons.css";
import {FunctionComponent, h} from "preact";
import {Route, Router} from "preact-router";
import FileSystem from "components/filesystem";

import Home from "routes/home";
import NotFoundPage from "routes/notfound";
import Editor from "routes/editor";

import "scss";

const App: FunctionComponent = () => {
	return (
		<div id="root">
			<FileSystem>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/edit/:file" component={Editor} />
					<NotFoundPage default />
				</Router>
			</FileSystem>
		</div>
	);
};

export default App;
