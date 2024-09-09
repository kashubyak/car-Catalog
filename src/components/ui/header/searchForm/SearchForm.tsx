import { useSearchForm } from 'hooks/useSearchForm'
import { FC } from 'react'
import Select from 'react-select'
import { ISearchFormProps } from 'types/content.interface'
import './SearchForm.css'
import { SortSelection } from './sortSelection/SortSelection'
import { Switch } from './switcher/Switch'

const SearchForm: FC<ISearchFormProps> = ({ onFilter, data }) => {
	const {
		searchContainerRef,
		isSearchActive,
		animatedComponents,
		handleChange,
		options,
		toggleSearch,
	} = useSearchForm({ onFilter, data })

	return (
		<form className='dFlex'>
			<div
				ref={searchContainerRef}
				className={`searchContainer ${isSearchActive ? 'active' : ''}`}
			>
				<Select
					maxMenuHeight={200}
					components={animatedComponents}
					classNamePrefix='custom-styles'
					onChange={handleChange}
					options={options}
					placeholder='Find cars'
					isMulti
					styles={{
						container: provided => ({
							...provided,
							width: '100%',
						}),
						control: provided => ({
							...provided,
							width: '100%',
						}),
					}}
				/>
				<SortSelection onFilter={onFilter} data={data} />
			</div>
			<i className='fa fa-search searchIcon' aria-hidden='true' onClick={toggleSearch} />
			<div className='switchTheme'>
				<Switch />
			</div>
		</form>
	)
}

export { SearchForm }
