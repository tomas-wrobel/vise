import {h, FunctionComponent, Fragment} from "preact";
import {useContext, useState} from "preact/hooks";
import FileSystemContext from "components/filesystem/context";
import List from "components/list";
import Grid from "components/grid";
import {Tree} from "utils/tree";
import Icon from "components/icon";
import Redirect from "utils/redirect";
import render from "preact-render-to-string";
import "./style.scss";

const Editor: FunctionComponent<Editor.Props> = ({file}) => {
	const fs = useContext(FileSystemContext);
	const [zoom, setZoom] = useState(1);
	const [map, setMap] = useState(true);
	if (!(+file in fs.all)) {
		return <Redirect to="/" />;
	}
	const tree = fs.all[+file];
	const saveURL = URL.createObjectURL(
		new Blob(
			[render(
				<FileSystemContext.Provider value={fs}>
					<Grid tree={tree} readonly="standalone" />
				</FileSystemContext.Provider>
			)],
			{
				type: "image/svg+xml"
			}
		)
	)
	return (
		<>
			{h(map ? Grid : List, {tree, onZoomChange: setZoom, zoom})}
			<div class="vertical toolbar">
				<button>
					<label>
						<input type="checkbox" checked={map} onInput={e => setMap(e.currentTarget.checked)} />
						<Icon style="round" name="" />
					</label>
				</button>
				<button>
					<a download="vise.svg" href={saveURL}>
						<Icon name="save_alt" />
					</a>
				</button>
				<button
					onClick={() => {
						if (zoom > 0.25) {
							setZoom(zoom - 0.25);
						}
					}}
				>
					<Icon name="zoom_out" style="outlined" />
				</button>
				<button
					onClick={() => {
						if (zoom <= 2.5) {
							setZoom(zoom + 0.25);
						}
					}}
				>
					<Icon name="zoom_in" style="outlined" />
				</button>
			</div>
			<div class="horizontal toolbar">
				<button onClick={() => fs.undo()}>
					<Icon name="undo" />
				</button>
				<button onClick={() => fs.redo()}>
					<Icon name="redo" />
				</button>
			</div>
		</>
	);

};

declare namespace Editor {
	export interface Props {
		file: `${number}`;
	}

	export interface State {
		undo: Tree.Data[];
		redo: Tree.Data[];
		zoom: number;
		view: string;
	}
}

export default Editor;
