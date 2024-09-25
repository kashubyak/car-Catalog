import { CarDetail } from 'components/screens/CarDetail/CarDetail'
import { CreateCarForm } from 'components/screens/CreateCarForm/CreateCarForm'
import { Favorites } from 'components/screens/Favorites/Favorites'
import { Home } from 'components/screens/Home/Home'
import { HttpError } from 'components/screens/HttpError/HttpError'
import { PromotionVideo } from 'components/screens/PromotionVideo/PromotionVideo'
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
	const [activeMenuItem, setActiveMenuItem] = useState<string>('home')

	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
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
						<Favorites setActiveMenuItem={setActiveMenuItem} activeMenuItem='favorite' />
					}
					path='/favorite'
				/>
				<Route
					element={
						<PromotionVideo
							setActiveMenuItem={setActiveMenuItem}
							activeMenuItem='promotionVideo'
						/>
					}
					path='/promotion-video'
				/>

				<Route path='*' element={<HttpError code={404} title='Page is not found' />} />
			</Routes>
		</BrowserRouter>
	)
}

export { Router }
