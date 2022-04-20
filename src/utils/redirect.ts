import {Component} from "preact";
import {route} from "preact-router";

class Redirect extends Component<Redirect.Props> {
	componentWillMount() {
		route(this.props.to, true);
	}

	render() {
		return null;
	}
}

declare namespace Redirect {
	export interface Props {
		to: string;
	}
}

export default Redirect;