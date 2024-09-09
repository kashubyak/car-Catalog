import { useMemo } from 'react'
import { useTypedSelector } from './useTypedSelector'

export const useFavorites = () => {
	const favorites = useTypedSelector(state => state.favorites)
	const memoizedFavorites = useMemo(() => favorites, [favorites])
	return { favorites: memoizedFavorites }
}
