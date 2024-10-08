import axios from 'axios'
import { ICar, ICarData } from 'types/car.interface'
export const CarService = {
	async getAll() {
		const response = await axios.get<ICar[]>('https://car-catalog-db.vercel.app/cars/')
		return response.data
	},
	async getById(id: string) {
		const response = await axios.get<ICar[]>(
			`https://car-catalog-db.vercel.app/cars/?id=${id}`,
		)
		return response.data[0]
	},
	async create(data: ICarData) {
		return await axios.post('https://car-catalog-db.vercel.app/cars/', data)
	},
	async delete(id: string) {
		return await axios.delete(`https://car-catalog-db.vercel.app/cars/${id}`)
	},
}
