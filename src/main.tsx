import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'components/screens/httpEroor/ErrorBoundary'
import { Router } from 'components/ui/Router'
import { Loading } from 'components/ui/loading/Loading'
import { Notification } from 'components/ui/notafication/Notification'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeInitializer } from 'store/themeSlice/ThemeInitializer'
import './assets/style/global.css'
import { Store, persistor } from './store/Store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const rootElement = document.getElementById('root')
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<Provider store={Store}>
					<ErrorBoundary>
						<PersistGate loading={<Loading text={'Loading...'} />} persistor={persistor}>
							<Router />
							<Notification />
							<ThemeInitializer />
						</PersistGate>
					</ErrorBoundary>
				</Provider>
			</QueryClientProvider>
		</React.StrictMode>,
	)
}
