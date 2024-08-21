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

	const handleDoubleTap = useCallback((e: TouchEvent) => {
		const video = videoRef.current
		if (!video) return
		const ScreenWidth = innerWidth
		if (ScreenWidth > 1120) return
		e.preventDefault()
		const touch = e.changedTouches[0]
		const videoRect = video.getBoundingClientRect()
		const touchX = touch.clientX - videoRect.left
		if (touchX < videoRect.width / 2) {
			video.currentTime = Math.max(0, video.currentTime - 5)
		} else {
			video.currentTime = Math.min(video.duration, video.currentTime + 5)
		}
	}, [])
	useEffect(() => {
		const video = videoRef.current
		if (!video) return
		let lastTap = 0
		const handleTouchEnd = (e: TouchEvent) => {
			const currentTime = new Date().getTime()
			const timeSinceLastTap = currentTime - lastTap
			if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
				handleDoubleTap(e as unknown as TouchEvent)
			}
			lastTap = currentTime
		}
		video.addEventListener('touchend', handleTouchEnd)
		return () => {
			video.removeEventListener('touchend', handleTouchEnd)
		}
	}, [handleDoubleTap])

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
			if (!video.paused) {
				video.pause()
			}
			const handleMouseUp = () => {
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
				if (!video.paused) {
					video.play()
				}
			}
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
		},
		[videoTools.videoTime],
	)

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

	const toggleMute = () => {
		if (videoRef.current) {
			setVideoTools(prev => {
				const newVolume = prev.volume > 0 ? 0 : videoTools.previouseVolume
				videoRef.current!.volume = newVolume / 100
				return {
					...prev,
					volume: newVolume,
					previouseVolume: prev.volume > 0 ? prev.volume : prev.previouseVolume,
				}
			})
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
				case 'KeyM':
					toggleMute()
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
		toggleMute,
	}
}
export { usePlayer }
