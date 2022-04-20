import {createContext} from "preact";
import type List from "../list";

interface FileSystemContext {
	undo(): void;
	redo(): void;
	change(index: number, replacer: (this: any, key: string, value: any) => any): void;
	delete(i: number): void;
	add(): void;

	readonly all: List.Item[];
}

const FileSystemContext = createContext<FileSystemContext>({
	all: [],
	undo() {},
	redo() {},
	change() {},
	delete() {},
	add() {},
});

export default FileSystemContext;