import CarDetail from 'components/screens/carDetail/CarDetail'
import { Home } from 'components/screens/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
