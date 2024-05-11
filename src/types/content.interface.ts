import { ICar } from './car.interface'

export interface ISideBarState {
	setActiveMenuItem: React.Dispatch<React.SetStateAction<string>>
	activeMenuItem: string
}
export interface ICatalog {
	data?: ICar[]
}
