import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { FC, useEffect, useMemo } from 'react'
import styles from './Notification.module.css'

const Notification: FC = () => {
	const notifications = useTypedSelector(state => state.notification)
	const { removeNotification } = useActions()

	useEffect(() => {
		notifications.forEach(notification => {
			const timer = setTimeout(() => {
				removeNotification(notification.id)
			}, 3000)
			return () => clearTimeout(timer)
		})
	}, [notifications, removeNotification])

	const renderNotification = useMemo(() => {
		return notifications.map(notification => (
			<div
				key={notification.id}
				className={styles.notification}
				style={{ backgroundColor: notification.backgroundColor }}
			>
				{notification.message}
			</div>
		))
	}, [notifications])
	return <div className={styles.notificationContainer}>{renderNotification}</div>
}

export { Notification }
