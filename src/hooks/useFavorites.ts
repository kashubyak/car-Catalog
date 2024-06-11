import { RootState } from 'store/Store'
import { useTypedSelector } from './useTypedSelector'

export const useFavorites = () => {
	const favorites = useTypedSelector((state: RootState) => state.favorites)
	return { favorites }
}
