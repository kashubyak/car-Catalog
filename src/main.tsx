import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import './assets/style/global.css'
import { Router } from './components/ui/Router'
import { AuthProvider } from './providers/AuthProvides'
import { BurgerProvides } from './providers/BurgerProvides'
import { ThemeProvider } from './providers/ThemeProvides'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<ThemeProvider>
				<BurgerProvides>
					<Router />
				</BurgerProvides>
			</ThemeProvider>
		</AuthProvider>
	</QueryClientProvider>,
)
