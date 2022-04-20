/**
 * @author Tomáš Wróbel
 * @license MIT
 * @format
 *
 * Home is just file explorer
 */
import {FunctionComponent, h, Fragment} from "preact";
import {useContext} from "preact/hooks";
import ColorPicker from "components/colorpicker";
import FileSystemContext from "components/filesystem/context";
import Grid from "components/grid";
import "./style.scss";

const Home: FunctionComponent = () => {
	const fs = useContext(FileSystemContext);
	return (
		<>
			<main>
				{fs.all.map((tree, i) => (
					<a class="thumbnail" href={`/edit/${i}`} key={i}>
						<Grid editing={i} />
						<div class="overlay">
							<span class="name">{tree.text}</span>
						</div>
					</a>
				))}
			</main>
		</>
	);
};

export default Home;
