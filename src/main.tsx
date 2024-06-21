import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from 'components/ui/Router'
import { Notification } from 'components/ui/notafication/Notification'
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
		<QueryClientProvider client={queryClient}>
			<Provider store={Store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router />
					<Notification />
					<ThemeInitializer />
				</PersistGate>
			</Provider>
		</QueryClientProvider>,
	)
}
