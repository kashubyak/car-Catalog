import { useTypedSelector } from './useTypedSelector'

export const useBurger = () => {
	return useTypedSelector(state => state.burger.open)
}
