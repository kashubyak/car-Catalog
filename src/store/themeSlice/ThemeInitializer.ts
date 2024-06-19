import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from 'store/themeSlice/Theme.Slice'

const ThemeInitializer = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(actions.initializeTheme())
	}, [dispatch])
	return null
}

export { ThemeInitializer }
