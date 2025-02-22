import { useState, useEffect } from "react";

export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState<boolean>(() => {
		if (typeof window === "undefined") return false;
		return window.matchMedia(query).matches;
	});

	useEffect(() => {
		if (typeof window === "undefined") return;

		const mediaQuery = window.matchMedia(query);
		const updateMatch = () => setMatches(mediaQuery.matches);

		mediaQuery.addEventListener("change", updateMatch);
		return () => mediaQuery.removeEventListener("change", updateMatch);
	}, [query]);

	return matches;
};
