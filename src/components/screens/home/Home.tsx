import { useQuery } from '@tanstack/react-query'
import { RegistrationMenu } from 'components/screens/RegistrationMenu/RegistrationMenu'
import { Catalog } from 'components/ui/catalog'
import { Header } from 'components/ui/header/Header'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { SetStateAction } from 'react'
import { CarService } from 'services/car.service'
import { MenuLinks } from '../../ui/navBar/menuLinks/MenuLinks'
import './media.css'

const Home = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['cars'],
		queryFn: () => CarService.getAll(),
	})
	const user = useTypedSelector(state => state.user.user)
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
