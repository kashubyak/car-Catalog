import { useRef, useState } from 'react'
import styles from './Editor.module.css'
import { applyStyle, TStyle } from './email-style'
const Editor = () => {
	const [text, setText] = useState('')
	const textRef = useRef<HTMLTextAreaElement | null>(null)
	const [selectionStart, setSelectionStart] = useState(0)
	const [selectionEnd, setSelectionEnd] = useState(0)
	const updateSelection = () => {
		if (!textRef.current) return
		setSelectionStart(textRef.current?.selectionStart)
		setSelectionEnd(textRef.current?.selectionEnd)
	}
	const applyFormat = (type: TStyle) => {
		const selectedText = text.substring(selectionStart, selectionEnd)
		if (!selectedText) return
		const before = text.substring(0, selectionStart)
		const after = text.substring(selectionEnd)
		setText(before + applyStyle(type, selectedText) + after)
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
				<button onClick={() => setText('')}>
					<i className='fa fa-eraser' aria-hidden='true'></i>
				</button>
				<button onClick={() => applyFormat('bold')}>
					<i className='fa fa-bold' aria-hidden='true'></i>
				</button>
				<button onClick={() => applyFormat('italic')}>
					<i className='fa fa-italic' aria-hidden='true'></i>
				</button>
				<button onClick={() => applyFormat('underline')}>
					<i className='fa fa-underline' aria-hidden='true'></i>
				</button>
			</div>
		</div>
	)
}
export { Editor }
