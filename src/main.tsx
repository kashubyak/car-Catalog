import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from 'components/ui/Router'
import { Notification } from 'components/ui/notafication/Notification'
import { AuthProvider } from 'providers/AuthProvides'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './assets/style/global.css'
import { BurgerProvides } from './providers/BurgerProvides'
import { ThemeProvider } from './providers/ThemeProvides'
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
					<AuthProvider>
						<ThemeProvider>
							<BurgerProvides>
								<Router />
								<Notification />
							</BurgerProvides>
						</ThemeProvider>
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>,
	)
}
