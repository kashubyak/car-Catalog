import React, { Component, ReactNode } from 'react'
import { HttpError } from './HttpError' // Імплементуйте шлях до вашого компоненту

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// Видаліть або закоментуйте цей рядок, щоб уникнути виводу помилок в консоль
		// console.error('Error occurred:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return <HttpError code={500} message="Something went wrong" />
		}
		return this.props.children
	}
}

export default ErrorBoundary
