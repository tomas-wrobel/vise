/**
 * @author Tomáš Wróbel
 * @license MIT
 * @format
 * 
 * Grid view, also called Map view, or Tree view,
 * is what makes Vise a mind map app.
 * It uses Non-layered tidy tree layout algorithm
 * by A.J. van der Ploeg
 */
import {FunctionComponent, h, Fragment} from "preact";
import List from "../list";
import {Tree} from "utils/tree";
import Layout from "utils/layout";
import FileSystemContext from "../filesystem/context";
import {useContext, useState} from "preact/hooks";
import "./style.scss";
import measure from "utils/wrapText";
import ColorPicker from "components/colorpicker";

const reduce = (prev: [number, number], current: Tree.Data): [number, number] => {
	const [width, height] = current.children.reduce(reduce, prev);
	return [
		Math.max(width, current.x + current.width),
		Math.max(height, current.y + current.height)
	];
};

const Grid: FunctionComponent<List.Props> = ({zoom = 1, editing: index}) => {
	const [picker, setPicker] = useState<Tree.Data | null>(null);
	const fs = useContext(FileSystemContext);
	const map = (tree: Tree.Data, i: number, array: Tree.Data[]) => {
		const notes = tree.children.filter(note => note.type === "note");
		const nodes = tree.children.filter(body => body.type !== "note");
		const {lines} = measure(tree.text);
		return (
			<g class={tree.type}>
				{/* arrows */}
				{nodes.map((node) => {
					const points = [
						[tree.x + tree.width / 2, tree.y + tree.height - 4],
						[tree.x + tree.width / 2, tree.y + tree.height + 20],
						[node.x + node.width / 2, node.y - 32],
						[node.x + node.width / 2, node.y - 12],
						[node.x + node.width / 2 + 8, node.y - 20],
						[node.x + node.width / 2, node.y - 12],
						[node.x + node.width / 2 - 8, node.y - 20],
					];
					const id = points.map(p => p.map(n => n.toString(16)).join("_")).join("-");
					return (
						<Fragment key={id}>
							<linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" class={tree.type} />
								<stop offset="100%" class={node.type} />
							</linearGradient>
							<polyline
								points={points.join(" ")}
								stroke={`url(#${id})`}
								fill="none"
								stroke-width={2}
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</Fragment>
					);
				})}
				<g class="item">
					<rect height={tree.height} width={tree.width} x={tree.x} y={tree.y} rx={6} />
					<foreignObject
						width={tree.width - 24}
						x={tree.x + 12}
						y={tree.y + 12}
						height={19 * lines.length}
						overflow="visible"
					>
						<textarea
							value={lines.join("\n")}
							placeholder="New item..."
							onInput={e => {
								fs.change(
									index,
									(key, current) => {
										if (current === tree) {
											return {
												...tree,
												text: e.currentTarget.value,
											};
										}

										if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
											return current;
										}
									}
								);
							}}
						/>
					</foreignObject>
					<text
						fill="#FFF"
						role="hidden"
						stroke="none"
						x={tree.x + tree.width - 102}
						y={tree.y + 14}
						class="material-icons-round"
						text-anchor="start"
						dominant-baseline="hanging"
					>
						invert_colors
					</text>
					<text
						fill-opacity="0.5"
						role="button"
						stroke="none"
						x={tree.x + tree.width - 102}
						y={tree.y + 14}
						class="material-icons-round"
						text-anchor="start"
						dominant-baseline="hanging"
						onClick={() => setPicker(picker === tree ? null : tree)}
					>
						invert_colors
					</text>
					<text
						fill="#FFF"
						stroke="none"
						role="hidden"
						x={tree.x + tree.width - 102}
						y={tree.y + 14}
						class="material-icons-round"
						text-anchor="start"
						dominant-baseline="hanging"
						dx={34}
					>
						add
					</text>
					<text
						fill-opacity="0.5"
						stroke="none"
						role="button"
						x={tree.x + tree.width - 102}
						y={tree.y + 14}
						class="material-icons-round"
						text-anchor="start"
						dominant-baseline="hanging"
						dx={34}
						onClick={(e?: Event) => {
							e?.preventDefault();
							fs.change(
								index,
								(key, value) => {
									if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
										if (value === tree) {
											return {
												...tree,
												children: [...tree.children, {
													text: "",
													type: "body",
													children: []
												}]
											};
										}
										return value;
									}
								}
							);
						}}
					>
						add
					</text>
					<text
						fill="#FFF"
						stroke="none"
						role="hidden"
						x={tree.x + tree.width - 102}
						y={tree.y + 14}
						class="material-icons-round"
						text-anchor="start"
						dominant-baseline="hanging"
						dx={68}
					>
						delete_forever
					</text>
					<text
						fill-opacity="0.5"
						stroke="none"
						role="button"
						x={tree.x + tree.width - 102}
						y={tree.y + 14}
						class="material-icons-round"
						text-anchor="start"
						dominant-baseline="hanging"
						dx={68}
						onClick={() => {
							fs.change(
								index,
								(key, value) => {
									if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
										if (value.children && value.children.includes(tree)) {
											return {
												...value,
												children: array.filter(t => t !== tree)
											};
										}
										return value;
									}
								});
						}}
					>
						delete_forever
					</text>
					{notes.map((note, i) => {
						const {lines} = measure(note.text, 16);
						return <Fragment key={i}>
							<foreignObject
								x={tree.x + 32}
								y={tree.y + 43 + i * 19}
								width={tree.width - 32}
								height={lines.length * 18}
								style="transform: translateY(-0.25em);"
							>
								<textarea value={note.text} onInput={e => fs.change(
									index,
									(key, value) => {
										if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
											if (value === note) {
												return {...note, text: e.currentTarget.value};
											}
											return value;
										}
									}
								)} placeholder="New item..." />
							</foreignObject>
							<circle fill="#FFF" stroke="none" r={3} cx={tree.x + 20} cy={tree.y + 48 + i * 19} />
						</Fragment>;
					})}
				</g>
				{nodes.map(map)}
			</g>
		);
	};
	const layout = Layout.layout(fs.all[index]);
	const [width, height] = reduce([0, 0], layout);
	return (
		<div style={{width: (width + 318) * zoom, height: (height + 321 * zoom)}} class="wrapper">
			<svg
				class="tree"
				viewBox={`0 0 ${(width + 318) / zoom} ${(height + 321) / zoom}`}
				width={width + 318}
				height={height + 321}
			>
				{map(layout, 0, [layout])}
				{picker && (
					<foreignObject x={picker.x + picker.width} y={picker.y} width={1} height={1} overflow="visible">
						<ColorPicker onClose={color => {
							if (color) {
								fs.change(
									index,
									(key, value) => {
										if (value === picker) {
											return {
												...value,
												type: color
											};
										}
										if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
											return value;
										}
									}
								);
							}
							setPicker(null);
						}} />
					</foreignObject>
				)}
			</svg>
		</div>
	);
};

export default Grid;
