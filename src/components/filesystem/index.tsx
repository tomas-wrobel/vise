import {Component, RenderableProps, h} from "preact";
import FileSystemContext from "./context";
import type List from "../list";
import {replace} from "lodash";

class FileSystem extends Component<{}, FileSystem.State> {
	constructor(props: {}) {
		super(props);

		const update = this.setState.bind(this);

		try {
			var all: List.Item[] = JSON.parse(localStorage.getItem("vise.files") || undefined!);
		} catch {
			var all: List.Item[] = [
				{
					type: "heading",
					children: [
						{
							text: "Heading",
							children: [],
							type: "color-1",
						},
						{
							text: "Heading",
							children: [],
							type: "color-6",
						},
					],
					text: "Editor",
				},
			];
		}

		let saveTimeout = NaN;

		this.state = {
			all,
			change(replacer: (this: any, key: string, value: any) => any) {
				window.clearTimeout(saveTimeout);

				const undoData = this.undoData.slice(0, 200);
				const replaced = JSON.stringify(undoData[0], replacer);
				
				undoData.unshift(JSON.parse(replaced));

				window.setTimeout(() => {
					localStorage.setItem(
						"vise.files",
						replaced
					);
				})

				update({
					undoData,
					all: undoData[0]
				});
			},
			undo() {
				const [all, ...undoData] = this.undoData;
				if (undoData.length) {
					update({
						undoData,
						redoData: [all, ...this.redoData],
						all: undoData[0]
					});
				}
			},
			redo() {
				if (this.redoData.length) {
					const [first, ...rest] = this.redoData;
					update({
						redoData: rest,
						undoData: [first, ...this.undoData],
					});
				}
			},
			delete(i: number) {
				update({
					undoData: [this.undoData[0].filter((old, j) => i !== j), ...this.undoData],
				});
			},
			add() {
				const undoData = [
					[
						...this.undoData[0],
						{
							type: "heading",
							children: [
								{
									text: "Heading",
									children: [],
									type: "color-1",
								},
								{
									text: "Heading",
									children: [],
									type: "color-6",
								},
							],
							text: "Editor",
						} as List.Item
					],
					...this.undoData,
				];
				update({
					undoData,
					all: undoData[0]
				});
			},
			undoData: [all],
			redoData: [] as List.Item[][]
		}
	}

	render({children}: RenderableProps<{}, any>) {
		return (
			<FileSystemContext.Provider value={this.state}>
				{children}
			</FileSystemContext.Provider>
		);
	}
}

declare namespace FileSystem {
	export interface State extends FileSystemContext {
		undoData: List.Item[][];
		redoData: List.Item[][];
	}
}

export default FileSystem;