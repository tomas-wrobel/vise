import type List from "components/list";

class Tree {
	c: Tree[];
	cs: number;
	x = 0;
	prelim = 0;
	mod = 0;
	shift = 0;
	change = 0;
	tl: Tree | null = null; // Left thread
	tr: Tree | null = null; // Right thread
	el: Tree | null = null; // extreme left nodes
	er: Tree | null = null; // extreme right nodes
	//sum of modifiers at the extreme nodes
	msel = 0;
	mser = 0;
	constructor(public w: number, public h: number, public y: number, public children: Tree[], public ignore = false) {
		this.c = children.filter(t => !t.ignore);
		this.cs = this.c.length;
	}
}

namespace Tree {
	export interface Data extends List.Item {
		x: number;
		y: number;
		width: number;
		height: number;
		children: Data[];
	}
}

function setExtremes(tree: Tree) {
	if (tree.cs === 0) {
		tree.el = tree;
		tree.er = tree;
		tree.msel = tree.mser = 0;
	} else {
		tree.el = tree.c[0].el;
		tree.msel = tree.c[0].msel;
		tree.er = tree.c[tree.cs - 1].er;
		tree.mser = tree.c[tree.cs - 1].mser;
	}
}

function bottom(tree: Tree) {
	return tree.y + tree.h;
}

/* A linked list of the indexes of left siblings and their lowest vertical coordinate.
 */
class IYL {
	constructor(public lowY: number, public index: number, public next: IYL) {}
}

function updateIYL(minY: number, i: number, ih: IYL) {
	// Remove siblings that are hidden by the new subtree.
	while (ih !== null && minY >= ih.lowY) {
		// Prepend the new subtree
		ih = ih.next;
	}
	return new IYL(minY, i, ih);
}

function distributeExtra(tree: Tree, i: number, si: number, distance: number) {
	// Are there intermediate children?
	if (si !== i - 1) {
		const nr = i - si;
		tree.c[si + 1].shift += distance / nr;
		tree.c[i].shift -= distance / nr;
		tree.c[i].change -= distance - distance / nr;
	}
}

function moveSubtree(tree: Tree, i: number, si: number, distance: number) {
	// Move subtree by changing mod.
	tree.c[i].mod += distance;
	tree.c[i].msel += distance;
	tree.c[i].mser += distance;
	distributeExtra(tree, i, si, distance);
}

function nextLeftContour(tree: Tree) {
	return tree.cs === 0 ? tree.tl : tree.c[0];
}

function nextRightContour(tree: Tree) {
	return tree.cs === 0 ? tree.tr : tree.c[tree.cs - 1];
}

function setLeftThread(tree: Tree, i: number, cl: Tree, modsumcl: number) {
	const li = tree.c[0].el!;
	li.tl = cl;
	// Change mod so that the sum of modifier after following thread is correct.
	const diff = modsumcl - cl.mod - tree.c[0].msel;
	li.mod += diff;
	// Change preliminary x coordinate so that the node does not move.
	li.prelim -= diff;
	// Update extreme node and its sum of modifiers.
	tree.c[0].el = tree.c[i].el;
	tree.c[0].msel = tree.c[i].msel;
}

// Symmetrical to setLeftThread
function setRightThread(tree: Tree, i: number, sr: Tree, modsumsr: number) {
	const ri = tree.c[i].er!;
	ri.tr = sr;
	const diff = modsumsr - sr.mod - tree.c[i].mser;
	ri.mod += diff;
	ri.prelim -= diff;
	tree.c[i].er = tree.c[i - 1].er;
	tree.c[i].mser = tree.c[i - 1].mser;
}

function seperate(tree: Tree, i: number, ih: IYL) {
	// Right contour node of left siblings and its sum of modifiers.
	let sr = tree.c[i - 1];
	let mssr = sr.mod;
	// Left contour node of right siblings and its sum of modifiers.
	let cl = tree.c[i];
	let mscl = cl.mod;
	while (sr !== null && cl !== null) {
		if (bottom(sr) > ih.lowY) {
			ih = ih.next;
		}
		// How far to the left of the right side of sr is the left side of cl.
		const distance = mssr + sr.prelim + sr.w - (mscl + cl.prelim);
		if (distance > 0) {
			mscl += distance;
			moveSubtree(tree, i, ih.index, distance);
		}

		const sy = bottom(sr);
		const cy = bottom(cl);
		if (sy <= cy) {
			sr = nextRightContour(sr)!;
			if (sr !== null) {
				mssr += sr.mod;
			}
		}
		if (sy >= cy) {
			cl = nextLeftContour(cl)!;
			if (cl !== null) {
				mscl += cl.mod;
			}
		}
	}

	// Set threads and update extreme nodes.
	// In the first case, the current subtree must be taller than the left siblings.
	if (sr === null && cl !== null) {
		setLeftThread(tree, i, cl, mscl);
	} else if (sr !== null && cl === null) {
		setRightThread(tree, i, sr, mssr);
	}
}

function positionRoot(tree: Tree) {
	// Position root between children, taking into account their mod.
	tree.prelim =
		(tree.c[0].prelim +
			tree.c[0].mod +
			tree.c[tree.cs - 1].mod +
			tree.c[tree.cs - 1].prelim +
			tree.c[tree.cs - 1].w) /
			2 -
		tree.w / 2;
}

function firstWalk(tree: Tree) {
	if (tree.cs === 0) {
		setExtremes(tree);
		return;
	}

	firstWalk(tree.c[0]);
	let ih = updateIYL(bottom(tree.c[0].el!), 0, null!);
	for (let i = 1; i < tree.cs; i++) {
		firstWalk(tree.c[i]);
		const minY = bottom(tree.c[i].er!);
		seperate(tree, i, ih);
		ih = updateIYL(minY, i, ih);
	}
	positionRoot(tree);
	setExtremes(tree);
}

function addChildSpacing(tree: Tree) {
	let d = 0;
	let modsumdelta = 0;
	for (let i = 0; i < tree.cs; i++) {
		d += tree.c[i].shift;
		modsumdelta += d + tree.c[i].change;
		tree.c[i].mod += modsumdelta;
	}
}

function secondWalk(tree: Tree, modsum: number) {
	modsum += tree.mod;
	// Set absolute (no-relative) horizontal coordinates.
	tree.x = tree.prelim + modsum;
	addChildSpacing(tree);
	for (let i = 0; i < tree.cs; i++) {
		secondWalk(tree.c[i], modsum);
	}
}

function layout(tree: Tree) {
	firstWalk(tree);
	secondWalk(tree, 0);
}

export {Tree, layout};
