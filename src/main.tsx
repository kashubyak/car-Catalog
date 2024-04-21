import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { Router } from './assets/components/ui/Router'
import { AuthProvider } from './assets/hooks/providers/AuthProvides'
import { BurgerProvides } from './assets/hooks/providers/BurgerProvides'
import { ThemeProvider } from './assets/hooks/providers/ThemeProvides'
import './assets/style/global.css'

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
