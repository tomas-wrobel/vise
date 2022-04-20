import {useState, useEffect} from "preact/hooks";

export default function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const matchList = window.matchMedia(query);
		function change(e: MediaQueryListEvent) {
			setMatches(e.matches);
		}
		matchList.addEventListener("change", change);

		return () => {
			matchList.removeEventListener("change", change);
		}
	}, [query])

	return matches;
}