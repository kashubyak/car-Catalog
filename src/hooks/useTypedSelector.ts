import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'store/Store'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector