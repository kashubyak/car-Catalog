import { useQuery } from '@tanstack/react-query'
import { CarService } from '../../../../services/car.service'
import { useAuth } from '../../../hooks/useAuth'
import { Catalog } from '../../ui/catalog'
import { Header } from '../../ui/header'
import CreateCarForm from './Create-car-Form/createCarForm'

const Home = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['cars'],
		queryFn: () => CarService.getAll(),
	})
	const { user } = useAuth()
	if (isLoading) return <p>Loading.....</p>
	return (
		<div>
			<h1>Cars</h1>
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
