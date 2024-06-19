import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IThemeState } from 'types/slice.interface'

const initialState: IThemeState = {
	theme: localStorage.getItem('theme') || 'darkTheme',
}
const ThemeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<string>) => {
			state.theme = action.payload
			localStorage.setItem('theme', state.theme)
			if (state.theme === 'darkTheme') {
				document.body.classList.add('darkTheme')
			} else {
				document.body.classList.remove('darkTheme')
			}
		},
		initializeTheme: state => {
			const storedTheme = localStorage.getItem('theme') || 'darkTheme'
			state.theme = storedTheme
			if (storedTheme === 'darkTheme') {
				document.body.classList.add('darkTheme')
			} else {
				document.body.classList.remove('darkTheme')
			}
		},
	},
})
export const { actions, reducer } = ThemeSlice
