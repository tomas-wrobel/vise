/**
 * @author Tomáš Wróbel
 * @license MIT
 * @format
 *
 * Home is just a file explorer
 */
import {FunctionComponent, h, Fragment} from "preact";
import {useContext} from "preact/hooks";
import FileSystemContext from "components/filesystem/context";
import Grid from "components/grid";
import "./style.scss";
import Icon from "components/icon";

const Home: FunctionComponent = () => {
	const fs = useContext(FileSystemContext);
	return (
		<>
			<main>
				{fs.all.map((tree, i) => (
					<a class="thumbnail" href={`/edit/${i}`} key={tree.text}>
						<Grid tree={tree} readonly />
						<div class="overlay">
							<span class="name">{tree.text}</span>
						</div>
					</a>
				))}
				<a class="add" onClick={() => fs.add()}>
					<div>
						<Icon name="add" />
					</div>
				</a>
			</main>
		</>
	);
};

export default Home;
