import { useCallback, useEffect, useRef, useState } from 'react'
import { IVideoElement } from 'types/content.interface'

export const usePlayer = () => {
	const videoRef = useRef<IVideoElement>(null)
	const [videoTools, setVideoTools] = useState({
		isPlaying: false,
		currentTime: 0,
		videoTime: 0,
		progress: 0,
	})

	useEffect(() => {
		const originalDuration = videoRef.current?.duration
		if (originalDuration)
			setVideoTools(prev => ({ ...prev, videoTime: originalDuration }))
	}, [videoRef.current?.duration])

	const toggleVideo = useCallback(() => {
		if (!videoTools.isPlaying) {
			videoRef.current?.play()
			setVideoTools(prev => ({ ...prev, isPlaying: true }))
		} else {
			videoRef.current?.pause()
			setVideoTools(prev => ({ ...prev, isPlaying: false }))
		}
	}, [videoTools.isPlaying])

	const forward = () => {
		if (videoRef.current) videoRef.current.currentTime += 10
	}
	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 10
	}

	const fullscreen = () => {
		const video = videoRef.current
		if (!video) return
		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen()
		} else if (video.mozRequestFullscreen) {
			video.mozRequestFullscreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		}
	}

	useEffect(() => {
		const video = videoRef.current
		if (!video) return
		const updateProgress = () => {
			setVideoTools(prev => ({ ...prev, currentTime: video.currentTime }))
			setVideoTools(prev => ({
				...prev,
				progress: (video.currentTime / videoTools.videoTime) * 100,
			}))
		}
		video.addEventListener('timeupdate', updateProgress)
		return () => {
			video.addEventListener('timeupdate', updateProgress)
		}
	}, [videoTools.videoTime])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.code) {
				case 'ArrowRight' && 'KeyL':
					forward()
					break
				case 'ArrowLeft' && 'KeyJ':
					revert()
					break
				case 'Space' && 'KeyK':
					e.preventDefault()
					toggleVideo()
					break
				case 'KeyF':
					fullscreen()
					break
				default:
					return
			}
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [toggleVideo])

	return {
		videoRef,
		toggleVideo,
		fullscreen,
		videoTools,
	}
}
