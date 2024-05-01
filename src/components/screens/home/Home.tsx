import { useQuery } from '@tanstack/react-query'
import { RegistrationMenu } from 'components/screens/RegistrationMenu/RegistrationMenu'
import { Catalog } from 'components/ui/catalog'
import { AuthContext } from 'providers/AuthProvides'
import { useContext } from 'react'
import { CarService } from 'services/car.service'
import { Header } from './header/Header'
import { MenuLinks } from './main/navBar/menuLinks/MenuLinks'
import './media.css'

const Home = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['cars'],
		queryFn: () => CarService.getAll(),
	})
	const { user } = useContext(AuthContext)

	if (isLoading) return <p>Loading.....</p>

	return (
		<div style={{ maxWidth: '1920px', margin: '0px auto', marginBottom: '30px' }}>
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
