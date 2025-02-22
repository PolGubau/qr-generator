import { useRef, useState } from "react";
import type { Route } from "./+types/home";
import { onSVGButtonClick } from "~/utils/download-utils";
import ErrorBoundary from "~/components/ErrorBoundary";
import { QRCodeSVG } from "~/utils/qr";
import { useNavigate } from "react-router";
import { useMediaQuery } from "~/hooks/useMediaQuery";

export function meta({ error: _e }: Route.MetaArgs) {
	return [
		{ title: "QR Generator | Pol Gubau Amores" },
		{
			name: "description",
			content: "Generate QR codes with ease.",
		},
	];
}
export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q") ?? "";
	const color = url.searchParams.get("color");
	return { q, color };
}
export default function Home({ loaderData }: Route.ComponentProps) {
	const { q } = loaderData;
	const navigate = useNavigate();

	const [text, setText] = useState(q || "");

	const qrRef = useRef<SVGSVGElement>(null);

	const displayedText = text ? text : "https://polgubau.com";
	const title = `QR-${displayedText}`;

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
		navigate(`?q=${e.target.value}`);
	};
	const isSmallScreen = useMediaQuery("(max-width: 640px)");
	const qrSize = isSmallScreen ? 240 : 480;
	return (
		<main className=" w-screen h-screen flex justify-center">
			<div className="flex flex-col gap-14 pb-24 max-w-2xl pt-20 md:pt-40 items-center w-full">
				<input
					type="search"
					// biome-ignore lint/a11y/noAutofocus: <explanation>
					autoFocus
					placeholder="https://polgubau.com"
					className="border-b-2 p-2 text-neutral-950 dark:text-neutral-50 text-2xl focus:outline-none"
					onChange={onInputChange}
					value={text}
				/>
				<ErrorBoundary fallback={<p>Text is too large :(</p>} resetKey={text}>
					<QRCodeSVG
						ref={qrRef}
						className="dark:invert"
						value={text ? text : "https://polgubau.com"}
						title={title}
						size={qrSize}
						bgColor={"transparent"}
						fgColor={"black"}
						level={"L"}
					/>
				</ErrorBoundary>
				<nav className="flex justify-center gap-4 w-full">
					<button
						type="submit"
						onClick={() => onSVGButtonClick(qrRef, title)}
						className="rounded-full px-4 py-1.5 bg-neutral-600/30 w-fit text-neutral-950 dark:text-neutral-50 cursor-pointer hover:bg-neutral-600/50 dark:hover:bg-neutral-600 transition-all"
					>
						Descargar SVG
					</button>
				</nav>
			</div>
		</main>
	);
}
