import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CarDetail from '../screens/carDetail/CarDetail'
import { Home } from '../screens/home/Home'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Home />} path='/' />
				<Route element={<CarDetail />} path='/car/:id' />

				<Route path='*' element={<div>Page is not found! Sorry(</div>} />
			</Routes>
		</BrowserRouter>
	)
}
export { Router }
