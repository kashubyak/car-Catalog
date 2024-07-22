export type TStyle = 'bold' | 'italic' | 'underline'

export const applyStyle = (type: TStyle, selectedText: string) => {
	switch (type) {
		case 'bold': {
			selectedText = '<b>' + selectedText + '</b>'
			break
		}
		case 'italic': {
			selectedText = '<i>' + selectedText + '</i>'
			break
		}
		case 'underline': {
			selectedText = '<u>' + selectedText + '</u>'
			break
		}
	}
	return selectedText
}
