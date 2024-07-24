export type TStyle = 'bold' | 'italic' | 'underline'

export const applyStyle = (type: TStyle, selectedText: string) => {
	const tagMap: { [key in TStyle]: { open: string; close: string } } = {
		bold: { open: '<b>', close: '</b>' },
		italic: { open: '<i>', close: '</i>' },
		underline: { open: '<u>', close: '</u>' },
	}

	const { open, close } = tagMap[type]

	const isWrappedWithTags = (text: string, openTag: string, closeTag: string) =>
		text.startsWith(openTag) && text.endsWith(closeTag)

	console.log(`Selected Text: "${selectedText}"`)
	if (isWrappedWithTags(selectedText, open, close)) {
		console.log(`Removing ${type} tags`)
		return selectedText.slice(open.length, -close.length)
	} else {
		console.log(`Adding ${type} tags`)
		return open + selectedText + close
	}
}
