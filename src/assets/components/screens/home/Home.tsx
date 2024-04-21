import { useQuery } from '@tanstack/react-query'
import { CarService } from '../../../../services/car.service'
import { useAuth } from '../../../hooks/useAuth'
import { RegistrationMenu } from '../../ui/RegistrationMenu'
import { Catalog } from '../../ui/catalog'
import { Header } from './header/Header'
import { MenuLinks } from './main/navBar/menuLinks/MenuLinks'
import './media.css'

const Home = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['cars'],
		queryFn: () => CarService.getAll(),
	})
	const { user } = useAuth()

	if (isLoading) return <p>Loading.....</p>

	return (
		<div style={{ maxWidth: '1920px', margin: '0px auto', padding: '0px 15px' }}>
			<RegistrationMenu />
			{user && (
				<>
					<Header />
					<div style={{ display: 'flex' }}>
						<MenuLinks />
						<Catalog data={data} />
					</div>
				</>
			)}
		</div>
	)
}

export { Home }
