import measure, {ctx} from "./measure";

export default function wrapText(text: string, fontSize = 17, weight = 400) {
	const lines = text.replace(
		/(?![^\n]{1,20}$)([^\n]{1,20})\s/g, '$1\n'
	).split("\n");

	return {lines, width: Math.max(...lines.map(l => measure(l, fontSize, weight)))}
}