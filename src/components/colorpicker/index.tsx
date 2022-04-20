import {h, FunctionComponent} from "preact";
import {useEffect, useRef, useState} from "preact/hooks";
import "./style.scss";

const colors = [] as [number, number, number, number][][];

for (let i = 0, j = 0; j < 3; j++) {
	colors[j] = [];
	for (let k = 0; k < 3; k++) {
		colors[j][k] = [++i, ++i, ++i, ++i];
	}
}

const ColorPicker: FunctionComponent<ColorPicker.Props> = ({onClose, ...props}) => {
	const [index, setIndex] = useState(0);
	const view = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const elements = view.current!.children;

		const watchIndex: IntersectionObserverCallback = (entries) => {
			const entry = entries.find(e => e.isIntersecting);
			if (entry) {
				for (let i = 0; ; i++) {
					if (elements[i] === entry.target) {
						setIndex(i);
						break;
					}
				}
			}
		}

		const observer = new IntersectionObserver(watchIndex, {
			root: view.current!,
			rootMargin: "0px",
			threshold: 0.75
		});

		for (let i = 0; i < elements.length; i++) {
			observer.observe(elements[i]);
		}

		return () => {
			observer.disconnect();
		}
	});

	return <div class="color-picker" {...props}>
		<h4>
			Color Picker
			<span class="material-icons-round" style="float: right;">
				<span
					onClick={() => {
						if (index) {
							view.current!.children[index - 1].scrollIntoView({
								behavior: "smooth"
							});
						}
					}}
					style={{opacity: index ? 1 : 0.5}}
				>
					arrow_back_ios
				</span>
				<span
					onClick={() => {
						if (index < colors.length) {
							view.current!.children[index + 1].scrollIntoView({
								behavior: "smooth"
							});
						}
					}}
					style={{opacity: index < 2 ? 1 : 0.5}}
				>
					arrow_forward_ios
				</span>
			</span>
		</h4>
		<div class="swipe-view" ref={view}>
			{colors.map((table, i) => (
				<section key={i} onClick={e => {
					if (e.target instanceof HTMLTableCellElement) {
						onClose(e.target.className);
					}
				}}>
					<table>
						{table.map((rows, i) => (
							<tr key={i}>
								{rows.map((data, i) => (
									<td key={i} class={`color-${data}`} />
								))}
							</tr>
						))}
					</table>
				</section>
			))}
		</div>
		<nav>
			{colors.map((_, i) => (
				<button
					style={{opacity: i === index ? 1 : 0.5}}
					title={`Page ${i + 1}`}
					onClick={() => setIndex(i)}
					key={i}
				/>
			))}
		</nav>
		<h5><span onClick={() => onClose()} style="cursor: pointer;">Close</span></h5>
	</div>;
};

declare namespace ColorPicker {
	export interface Props extends h.JSX.HTMLAttributes<HTMLDivElement> {
		onClose(color?: string): void;
	}
}

export default ColorPicker;