import { Component, ReactNode } from 'react'
import { HttpError } from './HttpError'

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

	render() {
		if (this.state.hasError) {
			return <HttpError code={500} title='Something went wrong' />
		}
		return this.props.children
	}
}

export { ErrorBoundary }
