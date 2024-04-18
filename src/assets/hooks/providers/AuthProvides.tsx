import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext } from 'react'
import { TypeUser } from '../../../types/user.interface'
import { UseLocalStorage } from '../useLocalStorage'

type TypeContext = {
	user: TypeUser
	setUser: Dispatch<SetStateAction<TypeUser>>
}
export const AuthContext = createContext<TypeContext>({ user: null, setUser: () => {} })

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = UseLocalStorage('user', null)
	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
