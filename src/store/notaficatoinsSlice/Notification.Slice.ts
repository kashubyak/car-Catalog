import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INotification } from 'types/slice.interface'

const initialState: INotification[] = []

const NotificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification: (
			state,
			action: PayloadAction<{ message: string; backgroundColor: string }>,
		) => {
			const id = new Date().getTime()
			state.push({ id, ...action.payload })
		},
		removeNotification: (state, action: PayloadAction<number>) => {
			return state.filter(notification => notification.id !== action.payload)
		},
	},
})

export const { actions, reducer } = NotificationSlice
