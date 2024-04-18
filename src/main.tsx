import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './assets/components/ui/Router'
import { AuthProvider } from './assets/hooks/providers/AuthProvides'
import { ThemeProvider } from './assets/hooks/providers/ThemeProvides'
import './assets/style/global.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ThemeProvider>
					<Router />
				</ThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>,
)
