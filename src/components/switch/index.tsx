import uniqueId from "lodash/uniqueId";
import {h, FunctionComponent, Fragment} from "preact";
import {useRef} from "preact/hooks";
import "./style.scss";

const Toggle: FunctionComponent<Toggle.Props> = (props) => {
	const {current: id} = useRef(uniqueId("switch"));
	return (
		<div class="toggle-switch">
			<input {...props} id={id} />
			<label for={id} />
		</div>
	);
};

declare namespace Toggle {
	export interface Props {
		checked: boolean;
		onInput: h.JSX.EventHandler<h.JSX.TargetedEvent<HTMLInputElement, Event>>;
	}
}