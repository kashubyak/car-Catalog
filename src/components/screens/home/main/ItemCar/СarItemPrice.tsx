import { FC } from 'react'

const CarItemPrice: FC<{ price: string }> = ({ price }) => {
	return (
		<p>
			{new Intl.NumberFormat('ru-RU', {
				style: 'currency',
				currency: 'USD',
			}).format(+price)}
		</p>
	)
}
export { CarItemPrice }
