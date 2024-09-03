import { useQuery } from '@tanstack/react-query'
import { RegistrationMenu } from 'components/screens/RegistrationMenu/RegistrationMenu'
import { Catalog } from 'components/ui/catalog'
import { Header } from 'components/ui/header/Header'
import { Loading } from 'components/ui/loading/Loading'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useEffect, useState } from 'react'
import { CarService } from 'services/car.service'
import { MenuLinks } from '../../ui/navBar/menuLinks/MenuLinks'

const Home = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['cars'],
		queryFn: () => CarService.getAll(),
	})
	const user = useTypedSelector(state => state.user.user)
	const [filteredData, setFilteredData] = useState(data || [])
	useEffect(() => {
		if (data) setFilteredData(data)
	}, [data])
	if (isLoading) return <Loading text={'Loading...'} />

	return (
		<div>
			{user ? (
				<>
					<Header onFilter={setFilteredData} data={data || []} />
					<div style={{ display: 'flex' }}>
						{/* @ts-ignore */}
						<MenuLinks activeMenuItem={'home'} />
						<Catalog data={filteredData} />
					</div>
				</>
			) : (
				<RegistrationMenu />
			)}
		</div>
	)
}
export { Home }
