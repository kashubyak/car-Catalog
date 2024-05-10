import { useQuery } from '@tanstack/react-query'
import { RegistrationMenu } from 'components/screens/RegistrationMenu/RegistrationMenu'
import { Catalog } from 'components/ui/catalog'
import { AuthContext } from 'providers/AuthProvides'
import { SetStateAction, useContext } from 'react'
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
		<div>
			<RegistrationMenu />
			{user && (
				<>
					<Header />
					<div style={{ display: 'flex' }}>
						<MenuLinks
							activeMenuItem={'home'}
							setActiveMenuItem={function (value: SetStateAction<string>): void {
								throw new Error('Function not implemented.')
							}}
						/>
						<Catalog data={data} />
					</div>
				</>
			)}
		</div>
	)
}
export { Home }
