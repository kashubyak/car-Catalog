import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CarService } from 'services/car.service'

const useDeleteCar = () => {
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['delete car'],
		mutationFn: (id: string) => CarService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cars'] })
		},
	})
	const deleteCar = (id: string) => {
		mutate(id)
	}
	return { deleteCar }
}
export { useDeleteCar }
