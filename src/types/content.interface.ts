import { ICar } from './car.interface'

export interface ISideBarState {
	setActiveMenuItem: React.Dispatch<React.SetStateAction<string>>
	activeMenuItem: string
}
export interface ICatalog {
	data?: ICar[]
}
export interface IOption {
	value: string
	label: string
}
export interface ISearchFormProps {
	onFilter: (filteredData: ICar[]) => void
	data: ICar[]
}
export interface IVideoElement extends HTMLVideoElement {
	msRequestFullscreen?: () => void
	mozRequestFullScreen?: () => void
	webkitRequestFullscreen?: () => void
}
