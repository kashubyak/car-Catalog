export interface ICar {
	id: string
	name: string
	model: string
	image: string
	price: string
}
export interface ICarData extends Omit<ICar, 'id'> {}

export interface ICarItem {
	car: ICar
	active: boolean
	onToggle: () => void
}
