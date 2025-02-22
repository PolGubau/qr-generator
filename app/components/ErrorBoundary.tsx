import type React from "react";
import { Component, type ReactNode } from "react";

type Props = {
	children: ReactNode;
	fallback?: ReactNode;
	resetKey: string | number; // Clave para detectar cambios (puede ser `searchQuery`)
};

type State = {
	hasError: boolean;
	error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: undefined };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error capturado en ErrorBoundary:", error, errorInfo);
	}

	componentDidUpdate(prevProps: Props) {
		// Si `resetKey` cambia y hay un error, reseteamos el estado
		if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
			this.setState({ hasError: false, error: undefined });
		}
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback ? (
				this.props.fallback
			) : (
				<div className="p-4 text-center">
					<h2 className="text-red-600 text-lg font-bold">¡Algo salió mal!</h2>
					<p className="text-gray-700">{this.state.error?.message}</p>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
