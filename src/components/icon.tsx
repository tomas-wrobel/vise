import {Component, h} from "preact";

class Icon extends Component<Icon.Props> {
	render({name, color, style = "", ...props}: Icon.Props) {
		return (
			<span style={{color}} class={"material-icons" + (style && "-" + style)} {...props}>
				{name}
			</span>
		);
	}
}

namespace Icon {
	export interface Props extends h.JSX.HTMLAttributes<HTMLSpanElement> {
		name: string;
		color?: string;
		style?: "" | "round" | "outlined";
	}
}

export default Icon;
