import { FC } from 'react'
import styles from './httpError.module.css'
interface IHttpError {
	code: string | number
	message: string
}
const HttpError: FC<IHttpError> = ({ code, message }) => {
	return (
		<div className={styles.errorShell}>
			<div className={styles.errorNumber} title={code.toString()}>
				{code}
			</div>
		</div>
	)
}
export { HttpError }
