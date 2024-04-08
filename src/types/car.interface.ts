export interface ICar {
	id: number
	name: string
	model: string
	image: string
	price: string
}

export interface ICarData extends Omit<ICar, 'id'> {}
