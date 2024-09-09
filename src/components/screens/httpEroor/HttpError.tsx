import { FC } from 'react'
import styles from './httpError.module.css'
interface IHttpError {
	code: string | number
	title: string
}
const HttpError: FC<IHttpError> = ({ code, title }) => {
	return (
		<div className={styles.errorShell}>
			<div className={styles.errorNumber} title={code.toString()}>
				{code}
			</div>
		</div>
	)
}
export { HttpError }
