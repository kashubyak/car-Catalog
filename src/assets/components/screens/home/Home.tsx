import { useQuery } from '@tanstack/react-query'
import { CarService } from '../../../../services/car.service'
import { useAuth } from '../../../hooks/useAuth'
import { RegistrationMenu } from '../../ui/RegistrationMenu'
import { Catalog } from '../../ui/catalog'
import { CreateCarForm } from './Create-car-Form/createCarForm'
import { Header } from './header/Header'
import './media.css'

const Home = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['cars'],
		queryFn: () => CarService.getAll(),
	})
	const { user } = useAuth()

	if (isLoading) return <p>Loading.....</p>

	return (
		<div style={{ maxWidth: '1440px', margin: '0px auto', padding: '0px 5px' }}>
			<RegistrationMenu />
			{user && (
				<>
					<Header />
					<CreateCarForm />
					<Catalog data={data} />
				</>
			)}
		</div>
	)
}

export { Home }
