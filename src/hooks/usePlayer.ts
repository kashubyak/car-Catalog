import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IVideoElement } from 'types/content.interface'

const usePlayer = () => {
	const videoRef = useRef<IVideoElement>(null)
	const controlsTimeoutRef = useRef<number | null>(null)
	const [videoTools, setVideoTools] = useState({
		isPlaying: false,
		currentTime: 0,
		videoTime: 0,
		progress: 0,
		isFullscreen: false,
		showControls: false,
		showCursor: true,
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
			showControls()
		}
	}, [videoTools.isPlaying])

	const forward = () => {
		if (videoRef.current) videoRef.current.currentTime += 5
	}
	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 5
	}

	const toggleFullscreen = () => {
		setVideoTools(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }))
	}

	const handleProgressClick = (e: React.MouseEvent) => {
		const video = videoRef.current
		if (!video) return
		const progressBar = e.currentTarget as HTMLElement
		const rect = progressBar.getBoundingClientRect()
		const clickX = e.clientX - rect.left
		const newTime = (clickX / progressBar.offsetWidth) * video.duration
		video.currentTime = newTime
	}

	const showControls = useCallback(() => {
		if (controlsTimeoutRef.current !== null) {
			clearTimeout(controlsTimeoutRef.current)
		}
		setVideoTools(prev => ({ ...prev, showControls: true, showCursor: true }))
	}, [])

	const hideControls = useCallback(() => {
		if (controlsTimeoutRef.current !== null) {
			clearTimeout(controlsTimeoutRef.current)
		}
		controlsTimeoutRef.current = window.setTimeout(() => {
			if (videoTools.isPlaying) {
				setVideoTools(prev => ({
					...prev,
					showControls: false,
					showCursor: false,
				}))
			}
		}, 3000)
	}, [videoTools.isPlaying])

	const handleMouseMove = useCallback(() => {
		showControls()
		if (videoTools.isPlaying) {
			hideControls()
		}
	}, [hideControls, showControls, videoTools.isPlaying])

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
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoTools.videoTime])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.code) {
				case 'ArrowRight':
				case 'KeyL':
					forward()
					break
				case 'ArrowLeft':
				case 'KeyJ':
					revert()
					break
				case 'Space':
				case 'KeyK':
					e.preventDefault()
					toggleVideo()
					break
				case 'KeyF':
				case 'Escape':
					toggleFullscreen()
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
		handleProgressClick,
		toggleFullscreen,
		videoTools,
		showControls,
		hideControls,
		handleMouseMove,
	}
}
export { usePlayer }
