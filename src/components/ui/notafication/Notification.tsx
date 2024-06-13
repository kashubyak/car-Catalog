import { useNotificationActions } from 'hooks/useActionsNot'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from 'store/Store'
import styles from './Notification.module.css'
const Notification: FC = () => {
	const dispatch = useDispatch()
	const { message, backgroundColor, visible } = useTypedSelector(
		(state: RootState) => state.notification,
	)
	const { hideNotification } = useNotificationActions()
	useEffect(() => {
		if (visible) {
			const timer = setTimeout(() => {
				dispatch(hideNotification())
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [visible, dispatch])

	if (!visible) return null
	return (
		<div className={styles.notification} style={{ backgroundColor }}>
			{message}
		</div>
	)
}
export { Notification }
