import { Favourite } from 'components/screens/Favourite/Favourite'
import CarDetail from 'components/screens/carDetail/CarDetail'
import { CreateCarForm } from 'components/screens/createCarForm/CreateCarForm'
import { Home } from 'components/screens/home/Home'
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
	const [activeMenuItem, setActiveMenuItem] = useState<string>('home')

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Home />} path='/' />
				<Route element={<CarDetail />} path='/car/:id' />
				<Route
					element={
						<CreateCarForm
							setActiveMenuItem={setActiveMenuItem}
							activeMenuItem='createCar'
						/>
					}
					path='/create-car'
				/>
				<Route
					element={
						<Favourite setActiveMenuItem={setActiveMenuItem} activeMenuItem='favourite' />
					}
					path='/favourite'
				/>

				<Route path='*' element={<div>Page is not found! Sorry(</div>} />
			</Routes>
		</BrowserRouter>
	)
}

export { Router }
