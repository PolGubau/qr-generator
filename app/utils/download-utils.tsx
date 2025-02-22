function downloadStringAsFile(data: string, filename: string) {
	const a = document.createElement("a");
	a.download = filename;
	a.href = data;
	a.click();
}

export function onSVGButtonClick(
	svgRef: React.RefObject<SVGSVGElement | null>,
	title: string,
) {
	const node = svgRef.current;
	if (node == null) {
		return;
	}

	// For SVG, we need to get the markup and turn it into XML.
	// Using XMLSerializer is the easiest way to ensure the markup
	// contains the xmlns. Then we make sure it gets the right DOCTYPE,
	// encode all of that to be safe to be encoded as a URI (which we
	// need to stuff into href).
	const serializer = new XMLSerializer();
	const fileURI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
		`<?xml version="1.0" standalone="no"?>${serializer.serializeToString(node)}`,
	)}`;

	downloadStringAsFile(fileURI, `${title}.svg`);
}
