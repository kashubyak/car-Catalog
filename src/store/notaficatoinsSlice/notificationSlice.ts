import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { INotificationState } from 'types/slice.interface'

const initialState: INotificationState = {
	message: '',
	backgroundColor: '',
	visible: false,
}
const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		showNotification: (
			state,
			action: PayloadAction<{ message: string; backgroundColor: string }>,
		) => {
			state.message = action.payload.message
			state.backgroundColor = action.payload.backgroundColor
			state.visible = true
		},
		hideNotification: state => {
			state.visible = false
		},
	},
})
export const { actions, reducer } = notificationSlice
