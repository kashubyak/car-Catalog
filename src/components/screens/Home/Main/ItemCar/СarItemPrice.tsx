import { FC } from 'react'

const CarItemPrice: FC<{ price: string }> = ({ price }) => {
	return (
		<p style={{ color: 'var(--white-color)', fontWeight: 'bolder' }}>
			{new Intl.NumberFormat('ru-RU', {
				style: 'currency',
				currency: 'USD',
			}).format(price ? +price : 0)}
		</p>
	)
}
export { CarItemPrice }
