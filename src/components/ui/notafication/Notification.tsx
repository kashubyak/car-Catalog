import { useActions } from 'hooks/useActions'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/Store'
import styles from './Notification.module.css'

const Notification: FC = () => {
	const notifications = useSelector((state: RootState) => state.notification)
	const { removeNotification } = useActions()

	useEffect(() => {
		notifications.forEach(notification => {
			const timer = setTimeout(() => {
				removeNotification(notification.id)
			}, 3000)
			return () => clearTimeout(timer)
		})
	}, [notifications])

	return (
		<div className={styles.notificationContainer}>
			{notifications.map(notification => (
				<div
					key={notification.id}
					className={styles.notification}
					style={{ backgroundColor: notification.backgroundColor }}
				>
					{notification.message}
				</div>
			))}
		</div>
	)
}

export { Notification }
