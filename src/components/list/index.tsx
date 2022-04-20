/**
 * @author Tomáš Wróbel
 * @license MIT
 *
 * I am the component providing list view.
 * A list is fast to view and edit
 * but has nothing to do with maps
 */
import {h, FunctionComponent} from "preact";
import {useContext, useEffect, useRef} from "preact/hooks";
import FileSystemContext from "../filesystem/context";
import Icon from "../icon";
import "./style.scss";
import measure from "utils/wrapText";
import useMediaQuery from "hooks/media_query";

const focus: MutationCallback = (mutations) => {
	for (const mutation of mutations) {
		const input = mutation.addedNodes[0];

		if (input instanceof HTMLElement) {
			input.querySelector("textarea")?.focus?.();
		}
	}
};

function prevent(event: Event) {
	event.preventDefault();
}

const observer = new MutationObserver(focus);

const List: FunctionComponent<List.Props> = ({editing, zoom = 1}) => {
	const active = useRef<List.Item | null>(null);
	const fs = useContext(FileSystemContext);
	const container = useRef<HTMLDivElement>(null);
	const phone = useMediaQuery("(max-width: 640px)");
	const tree = fs.all[editing];

	useEffect(() => {
		observer.observe(container.current!, {
			childList: true,
			subtree: true,
		});

		return () => observer.disconnect();
	});

	const previousLevel = (item: List.Item) => fs.change(
		editing,
		(key, value: List.Item) => {
			if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
				if (Array.isArray(value.children) && value.children.length && value.type !== "heading") {
					const index = value.children.findIndex(nested => nested.children.indexOf(item) > -1) + 1;
					if (index) {
						const returns = {
							...value,
							children: value.children.map((nested, i) => {
								if (i === index - 1) {
									return {...nested, children: nested.children.filter(i => i !== item)};
								}
								return nested;
							}),
						};
						returns.children.splice(index, 0, item);
						return returns;
					}
				}
				return value;
			}
		}
	);

	const map = (item: List.Item, index: number, array: List.Item[]) => {
		const {lines, width} = measure(item.text || "New item...", phone ? 17 : 20);
		return (
			<li class={item.type}>
				<textarea
					style={{width}}
					rows={lines.length}
					value={item.text}
					onFocus={() => active.current = item}
					onBlur={() => active.current = null}
					tabIndex={-1}
					onInput={e => fs.change(
						editing,
						(key, value) => {
							if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
								if (value === item) {
									return {
										...item,
										text: e.currentTarget.value,
									};
								}
								return value;
							}
						}
					)}
					onKeyDown={e => {
						if (e.key === "Enter") {
							e.preventDefault();
							if (!item.text) {
								previousLevel(item);
							} else if (e.ctrlKey) {
								fs.change(
									editing,
									(key, value) => {
										if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
											if (value === item) {
												return {
													...item,
													text:
														`${item.text.slice(0, e.currentTarget.selectionStart)
														}\n${item.text.slice(e.currentTarget.selectionEnd)}`,
												};
											}
											return value;
										}
									}
								);
							} else if (
								e.currentTarget.selectionStart === e.currentTarget.selectionEnd &&
								e.currentTarget.selectionStart === item.text.length
							) {
								if (tree.children === array || item.children.length || e.shiftKey) {
									fs.change(
										editing,
										(key, value) => {
											if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
												if (value === item) {
													if (item.type === "note") {
														return {
															...item,
															children: [
																...item.children,
																{
																	text: "",
																	children: [],
																	type: "note"
																},
															],
														};
													}
													const returns = {
														...item,
														children: [
															...item.children
														]
													};
													returns.children.splice(
														// The index of the first note.
														// If not present, insert the new body at the last position 
														(item.children.findIndex(n => n.type === "note") + 1) || item.children.length,
														0,
														{
															text: "",
															children: [],
															type: "body"
														}
													);
													return returns;

												}
												return value;
											}
										});

								} else {
									fs.change(
										editing,
										(key, value) => {
											if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
												if (value.children === array) {
													const returns = {
														...value,
														children: [...array],
													};
													returns.children.splice(index + 1, 0, {
														text: "",
														children: [],
														type: e.shiftKey || item.type === "note" ? "note" : "body",
													});
													return returns;
												}
												return value;
											}
										});

								}
							} else {
								e.currentTarget.selectionEnd = e.currentTarget.selectionStart = item.text.length;
							}
						}
						if (e.key === "Backspace" && !item.text) {
							fs.change(
								editing,
								(key, value) => {
									if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
										if (value.children === array) {
											return {
												...value,
												children: array.filter(a => a !== item),
											};
										}
										return value;
									}
								});
						}
						if (e.key === "Tab" && index && array !== tree.children) {
							e.preventDefault();
							if (!e.shiftKey) {
								fs.change(
									editing,
									(key, value) => {
										if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
											if (value.children === array) {
												const returns = {
													...value,
													children: [...array]
												};
												returns.children.splice(index - 1, 2, {
													...array[index - 1],
													children: array[index - 1].children.concat(item),
												});
												return returns;
											}
											return value;
										}
									});
							} else {
								previousLevel(item);
							}
						}
					}}
					placeholder="New item..."
				/>
				{!item.children.length || <ul class={item.type}>{item.children.map(map)}</ul>}
			</li>
		);
	};

	const add = (type: List.Item["type"], index: number) => (e?: Event) => {
		e?.preventDefault();
		const isInside = (
			active.current &&
			tree.children[index] === active.current ||
			tree.children[index].children.some(function some(i): boolean {
				return i === active.current || i.children.some(some);
			})
		);
		if (isInside) {
			var item = active.current!;
		} else {
			for (
				var item = tree.children[index];
				item.children.length;
				item = item.children[item.children.length - 1]
			);
		}
		const top = tree.children.includes(item) || !!item.children.length;
		fs.change(
			editing,
			(key, value) => {
				if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
					if (value === item && top) {
						return {
							...item,
							children: [...item.children, {
								text: "",
								type,
								children: []
							}]
						};
					} else if (!top && value.children?.includes(item)) {
						return {
							...value,
							children: [
								...value.children,
								{
									text: "",
									type,
									children: []
								}
							]
						};
					}
					return value;
				}
			}
		);
	};

	return (
		<div style={{zoom: `${zoom * 100}%`}} ref={container}>
			<h1>
				<input
					value={tree.text}
					onInput={e => fs.change(editing, (key, value) => {
						if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
							if (value === fs.all[editing]) {
								return {
									...value,
									text: e.currentTarget.value
								};
							}
							return value;
						}
					})}
					onKeyUp={e => e.key === "Enter" && fs.change(editing, (key, value) => {
						if (key !== "width" && key !== "height" && key !== "x" && key !== "y") {
							if (value === fs.all[editing]) {
								return {
									...value,
									children: [...value.children, {
										text: "",
										children: [],
										type: `color-${Math.floor(Math.random() * 36) + 1}`
									}]
								};
							}
							return value;
						}
					})}
				/>
			</h1>
			{fs.all[editing].children.map(map).map((tree, i) => (
				<ul class={`list ${tree.props.class}`} key={i}>
					{tree}
					<li class="add" onMouseDown={prevent} onClick={add("body", i)}>
						<Icon name="grid_view" style="round" role="button" />
					</li>
					<li />
					<li class="add" onMouseDown={prevent} onClick={add("note", i)}>
						<Icon name="description" style="round" role="button" />
					</li>
				</ul>
			))}
		</div>
	);
};

declare namespace List {
	export interface Props {
		zoom?: number;
		editing: number;
		onZoomChange?: (zoom: number) => void;
	}

	export interface Item {
		text: string;
		type: "note" | `color-${number}` | "body" | "heading";
		children: Item[];
		description?: string;
		link?: string;
	}
}

export default List;