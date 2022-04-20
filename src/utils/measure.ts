export const ctx = document.createElement("canvas").getContext("2d")!;

export default function measure(text: string, fontSize = 17, weight = 400) {
	ctx.font = `${weight} ${fontSize}px Roboto, sans-serif `;
	return ctx.measureText(text).width;
}