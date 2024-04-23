import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useState,
} from 'react'

type BurgerType = {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}
export const BurgerContext = createContext<BurgerType>({ open: false, setOpen: () => {} })
export const BurgerProvides: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [open, setOpen] = useState(true)
	return (
		<BurgerContext.Provider value={{ open, setOpen }}>{children}</BurgerContext.Provider>
	)
}
