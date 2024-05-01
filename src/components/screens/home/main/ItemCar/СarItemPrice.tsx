import { FC } from 'react'

const CarItemPrice: FC<{ price: string }> = ({ price }) => {
	return (
		<p style={{ color: 'var(--deam-white)' }}>
			{new Intl.NumberFormat('ru-RU', {
				style: 'currency',
				currency: 'USD',
			}).format(+price)}
		</p>
	)
}
export { CarItemPrice }
