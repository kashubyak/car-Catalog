import { Dispatch, useEffect, useState } from 'react'

export const UseLocalStorage = (key: string, defData: any): [any, Dispatch<any>] => {
	const [stateStorage, setStateStorage] = useState(() => {
		const localData = localStorage.getItem(key)
		return localData || defData
	})

	useEffect(() => {
		localStorage.setItem(key, String(stateStorage))
	}, [key, stateStorage])

	return [stateStorage, setStateStorage]
}
