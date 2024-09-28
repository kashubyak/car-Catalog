import { usePlayer } from 'hooks/usePlayer'
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'
import {
	IoPause,
	IoPlay,
	IoVolumeHigh,
	IoVolumeLow,
	IoVolumeMedium,
	IoVolumeMute,
	IoVolumeOff,
} from 'react-icons/io5'
import styles from './VideoElement.module.css'
import videoPorsche from '/public/img/PromotionPorsche.mp4'
import prewPorsche from '/public/img/PromotionPorschePrew.jpg'

const VideoElement = () => {
	const {
		videoRef,
		toggleVideo,
		handleProgressClick,
		toggleFullscreen,
		videoTools,
		hoverProgressTime,
		handleProgressHover,
		handleProgressLeave,
		showControls,
		hideControls,
		handleMouseMove,
		handleVolumeClick,
		toggleMute,
	} = usePlayer()

	return (
		<div
			onMouseMove={handleMouseMove}
			className={styles.wrapperVideo}
			style={{ cursor: videoTools.showCursor ? 'auto' : 'none' }}
		>
			<video
				src={videoPorsche}
				ref={videoRef}
				className={styles.player}
				onClick={toggleVideo}
				poster={prewPorsche}
				onPlay={hideControls}
				onPause={showControls}
				onDoubleClick={toggleFullscreen}
			/>
			<div
				className={`${styles.playerControls} ${
					videoTools.showControls || !videoTools.isPlaying
						? styles.showControls
						: styles.hideControls
				} ${videoTools.isFullscreen ? styles.fullscreenControls : ''}`}
			>
				<button className={styles.controlsButton} onClick={toggleVideo}>
					{videoTools.isPlaying ? <IoPause /> : <IoPlay />}
				</button>
				<div
					className={styles.progressBarPlayer}
					onMouseDown={handleProgressClick}
					onMouseMove={handleProgressHover}
					onMouseLeave={handleProgressLeave}
				>
					<div
						className={styles.progressBar}
						style={{ width: `${videoTools.progress}%` }}
					></div>
					{hoverProgressTime.time !== null && hoverProgressTime.position !== null && (
						<div
							className={styles.timeTooltip}
							style={{ left: `${hoverProgressTime.position}px` }}
						>
							{Math.floor(hoverProgressTime.time / 60)}:
							{('0' + Math.floor(hoverProgressTime.time % 60)).slice(-2)}
						</div>
					)}
				</div>

				<div className={`${styles.volumeControl} ${styles.controlsButton}`}>
					<div onClick={toggleMute}>
						{videoTools.volume > 75 ? (
							<IoVolumeHigh />
						) : videoTools.volume > 50 ? (
							<IoVolumeMedium />
						) : videoTools.volume > 25 ? (
							<IoVolumeLow />
						) : videoTools.volume > 0 ? (
							<IoVolumeOff />
						) : videoTools.volume === 0 ? (
							<IoVolumeMute />
						) : (
							''
						)}
					</div>
					<div className={styles.volumeBackGr} onMouseDown={handleVolumeClick}>
						<div className={styles.volumeLevelFull}>
							<div
								className={styles.volumeLevelCurrent}
								style={{ width: `${videoTools.volume}%` }}
							/>
						</div>
					</div>
				</div>

				<div className={styles.timeControls}>
					<p>
						{Math.floor(videoTools.currentTime / 60) +
							':' +
							('0' + Math.floor(videoTools.currentTime % 60)).slice(-2)}
					</p>
					<p>/</p>
					<p>
						{Math.floor(videoTools.videoTime / 60) +
							':' +
							('0' + Math.floor(videoTools.videoTime % 60)).slice(-2)}
					</p>
				</div>
				<button className={styles.controlsButton} onClick={toggleFullscreen}>
					{videoTools.isFullscreen ? (
						<AiOutlineFullscreenExit />
					) : (
						<AiOutlineFullscreen />
					)}
				</button>
			</div>
		</div>
	)
}
export { VideoElement }
