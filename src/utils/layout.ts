import List from "components/list";
import measure from "./wrapText";
import {layout, Tree} from "./tree";

class BoundingBox {
	/**
	 * @param {number} gap - the gap between sibling nodes
	 * @param {number} bottomPadding - the height reserved for connection drawing
	 */
	constructor(public gap: number, public bottomPadding: number) {
		this.gap = gap;
		this.bottomPadding = bottomPadding;
	}

	addBoundingBox(width: number, height: number) {
		return {width: width + this.gap, height: height + this.bottomPadding};
	}

	/**
	 * Return the coordinate without the bounding box for a node
	 */
	removeBoundingBox(x: number, y: number) {
		return {x: x + this.gap / 2, y};
	}
}

class Layout {
	constructor(public bb: BoundingBox) {}

	/**
	 * Layout treeData.
	 * Return modified treeData and the bounding box encompassing all the nodes.
	 *
	 * See getSize() for more explanation.
	 */
	layout(treeData: List.Item) {
		const tree = this.convert(treeData);
		layout(tree);
		this.assignCoordinates(tree, treeData);
		return treeData as Tree.Data;
	}

	/**
	 * Returns Tree to layout, with bounding boxes added to each node.
	 */
	convert(treeData: List.Item, y = 16): Tree {
		const notes = treeData.children.filter(note => note.type === "note");
		const heading = measure(treeData.text, 17, 600);
		const width =
			Math.max(
				...notes.map(n => measure(n.text).width + 20),
				heading.width + 78,
				measure("New item...", 17, 600).width + 78
			) + 34;
		const height = (notes.length + (heading.lines.length || 1)) * 19 + 24;
		Object.assign(treeData, {width, height});
		const {width: treeWidth, height: treeHeight} = this.bb.addBoundingBox(width, height);

		return new Tree(
			treeWidth,
			treeHeight,
			y,
			treeData.children.map(child => this.convert(child, y + treeHeight)),
			treeData.type === "note"
		);
	}

	/**
	 * Assign layout tree x, y coordinates back to treeData,
	 * with bounding boxes removed.
	 */
	assignCoordinates(tree: Tree, treeData: List.Item) {
		Object.assign(treeData, this.bb.removeBoundingBox(tree.x, tree.y));
		const children = treeData.children; 
		for (let i = 0; i < children.length; i++) {
			this.assignCoordinates(tree.children[i], children[i]);
		}
	}
}

export {Layout, BoundingBox};
export default new Layout(new BoundingBox(80, 80));