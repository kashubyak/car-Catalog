import { TypeUser } from './user.interface'

export interface INotification {
	id: number
	message: string
	backgroundColor: string
}
export interface IThemeState {
	theme: string
}
export interface IBurgerState {
	open: boolean
}
export interface iUserState {
	user: TypeUser | null
}
