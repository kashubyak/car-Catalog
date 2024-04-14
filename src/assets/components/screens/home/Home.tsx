import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { CarService } from '../../../../services/car.service'
import { ThemeContext } from '../../../hooks/providers/ThemeProvides'
import { useAuth } from '../../../hooks/useAuth'
import { Catalog } from '../../ui/catalog'
import { Header } from '../../ui/header'
import CreateCarForm from './Create-car-Form/createCarForm'

const Home = () => {
	const { theme, setTheme } = useContext(ThemeContext)
	const changeTheme = () => {
		setTheme(theme === 'darkTheme' ? 'lightTheme' : 'darkTheme')
	}
	const { data, isLoading } = useQuery({
		queryKey: ['cars'],
		queryFn: () => CarService.getAll(),
	})
	const { user } = useAuth()

	if (isLoading) return <p>Loading.....</p>

	return (
		<div>
			<h1>Cars</h1>
			<button onClick={changeTheme}>click</button>

			<Header />
			{user && (
				<>
					<CreateCarForm />
					<Catalog data={data} />
				</>
			)}
		</div>
	)
}

export default Home
