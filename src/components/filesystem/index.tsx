import {Component, RenderableProps, h} from "preact";
import FileSystemContext from "./context";
import type List from "../list";

class FileSystem extends Component<{}, FileSystemContext> {
	state = {
		get all() {
			return this.undoData[0];
		},
		change(i: number, replacer: (this: any, key: string, value: any) => any) {
			const undoData = this.undoData.slice(0, 200);
			undoData.unshift([...this.undoData[0]]);
			undoData[0][i] = JSON.parse(
				JSON.stringify(undoData[0][i], replacer)
			);
			setTimeout(() => {
				localStorage.setItem("vise.files", JSON.stringify(undoData[0]));
			}, 100);
			this.update({
				undoData,
				all: undoData[0]
			});
		},
		undo() {
			const [all, ...undoData] = this.undoData;
			if (undoData.length) {
				this.update({
					undoData,
					redoData: [all, ...this.redoData],
					all: undoData[0]
				});
			}
		},
		redo() {
			if (this.redoData.length) {
				const [first, ...rest] = this.redoData;
				this.update({
					redoData: rest,
					undoData: [first, ...this.undoData],
				});
			}
		},
		delete(i: number) {
			this.update({
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
					},
				],
				...this.undoData,
			];
			this.update({
				undoData,
				all: undoData[0]
			});
		},
		undoData: [(function(): List.Item[] {
			try {
				return JSON.parse(localStorage.getItem("vise.files") || undefined!);
			} catch {
				return [
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
		})()],
		redoData: [] as List.Item[][],
		update: (s: any) => this.setState(s),
	};

	render({children}: RenderableProps<{}, any>) {
		return (
			<FileSystemContext.Provider value={this.state}>
				{children}
			</FileSystemContext.Provider>
		);
	}
}

export default FileSystem;