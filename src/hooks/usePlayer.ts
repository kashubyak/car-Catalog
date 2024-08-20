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
		volume: 100,
		previouseVolume: 100,
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

	const forwardVideo = () => {
		if (videoRef.current) videoRef.current.currentTime += 5
	}
	const revertVideo = () => {
		if (videoRef.current) videoRef.current.currentTime -= 5
	}

	const toggleFullscreen = () => {
		setVideoTools(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }))
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

	const handleProgressClick = useCallback(
		(e: React.MouseEvent) => {
			const video = videoRef.current
			if (!video) return
			const progressBar = e.currentTarget as HTMLElement
			const rect = progressBar.getBoundingClientRect()
			const updateTime = (clientX: number) => {
				const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width))
				const newTime = (clickX / rect.width) * video.duration
				video.currentTime = newTime
				setVideoTools(prev => ({
					...prev,
					currentTime: newTime,
					progress: (newTime / videoTools.videoTime) * 100,
				}))
			}
			updateTime(e.clientX)
			const handleMouseMove = (moveEvent: MouseEvent) => {
				updateTime(moveEvent.clientX)
			}
			const handleMouseUp = () => {
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
			}
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
		},
		[videoTools.videoTime],
	)

	const handleVolumeClick = useCallback((e: React.MouseEvent) => {
		const video = videoRef.current
		if (!video) return
		const volumeBar = e.currentTarget as HTMLElement
		const rect = volumeBar.getBoundingClientRect()
		const updateVolume = (clientY: number) => {
			const cursorY = clientY - rect.top
			const newVolume = Math.max(0, Math.min(100, 1 - cursorY / rect.height) * 100)
			if (videoRef.current) {
				videoRef.current.volume = newVolume / 100
			}
			setVideoTools(prev => ({
				...prev,
				volume: newVolume,
				previouseVolume: newVolume > 0 ? newVolume : videoTools.previouseVolume,
			}))
		}
		updateVolume(e.clientY)
		const handleMouseMove = (MouseEvent: MouseEvent) => {
			updateVolume(MouseEvent.clientY)
		}
		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}, [])

	const louderVolume = () => {
		if (videoRef.current) {
			const currentVolume = videoRef.current.volume
			const newVolume = Math.min(currentVolume + 0.1, 1)
			videoRef.current.volume = newVolume
			setVideoTools(prev => ({
				...prev,
				volume: Math.round(newVolume * 100),
			}))
		}
	}
	const lowerVolume = () => {
		if (videoRef.current) {
			const currentVolume = videoRef.current.volume
			const newVolume = Math.max(currentVolume - 0.1, 0)
			videoRef.current.volume = newVolume
			setVideoTools(prev => ({
				...prev,
				volume: Math.round(newVolume * 100),
			}))
		}
	}

	const toogleMute = () => {
		if (videoRef.current) {
			if (videoTools.volume > 0) {
				setVideoTools(prev => ({
					...prev,
					volume: 0,
				}))
				videoRef.current.volume = 0
			} else {
				setVideoTools(prev => ({
					...prev,
					volume: videoTools.previouseVolume,
				}))
				videoRef.current.volume = videoTools.previouseVolume / 100
			}
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
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoTools.videoTime])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.code) {
				case 'ArrowRight':
				case 'KeyL':
					forwardVideo()
					break
				case 'ArrowLeft':
				case 'KeyJ':
					revertVideo()
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
				case 'ArrowUp':
					e.preventDefault()
					louderVolume()
					break
				case 'ArrowDown':
					e.preventDefault()
					lowerVolume()
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
		handleVolumeClick,
		toogleMute,
	}
}
export { usePlayer }
