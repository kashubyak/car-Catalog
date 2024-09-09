import { FC, useRef, useState } from 'react'
import styles from './Editor.module.css'
import { applyStyle, TStyle } from './email-style'

interface IEditorProps {
	text: string
	setText: (text: string) => void
}
interface ISelection {
	start: number
	end: number
}

const Editor: FC<IEditorProps> = ({ text, setText }) => {
	const textRef = useRef<HTMLTextAreaElement | null>(null)
	const [selection, setSelection] = useState<ISelection>({ start: 0, end: 0 })

	const updateSelection = () => {
		if (textRef.current) {
			setSelection({
				start: textRef.current.selectionStart ?? 0,
				end: textRef.current.selectionEnd ?? 0,
			})
		}
	}

	const applyFormat = (type: TStyle) => {
		const selectedText = text.substring(selection.start, selection.end)
		if (!selectedText) return
		const before = text.substring(0, selection.start)
		const after = text.substring(selection.end)
		setText(before + applyStyle(type, selectedText) + after)
	}

	const handleButtonClick = (event: React.MouseEvent, callback: () => void) => {
		event.preventDefault()
		callback()
	}

	return (
		<div className={styles.editor}>
			<textarea
				ref={textRef}
				spellCheck='false'
				placeholder='Description...'
				className={styles.editorArea}
				onSelect={updateSelection}
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<div className={styles.tools}>
				<button onClick={e => handleButtonClick(e, () => setText(''))}>
					<i className='fa fa-eraser' aria-hidden='true'></i>
				</button>
				<button onClick={e => handleButtonClick(e, () => applyFormat('bold'))}>
					<i className='fa fa-bold' aria-hidden='true'></i>
				</button>
				<button onClick={e => handleButtonClick(e, () => applyFormat('italic'))}>
					<i className='fa fa-italic' aria-hidden='true'></i>
				</button>
				<button onClick={e => handleButtonClick(e, () => applyFormat('underline'))}>
					<i className='fa fa-underline' aria-hidden='true'></i>
				</button>
			</div>
		</div>
	)
}

export { Editor }
