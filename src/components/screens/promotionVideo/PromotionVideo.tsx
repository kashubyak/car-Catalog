import homeStyle from 'components/screens/home/main/ItemCar/CarItem.module.css'
import { Header } from 'components/ui/header/Header'
import { MenuLinks } from 'components/ui/navBar/menuLinks/MenuLinks'
import { usePlayer } from 'hooks/usePlayer'
import { FC } from 'react'
import { AiOutlineFullscreen } from 'react-icons/ai'
import { IoPause, IoPlay } from 'react-icons/io5'
import { ISideBarState } from 'types/content.interface'
import styles from './PromotionVideo.module.css'
import videoPorsche from '/public/img/PromotionPorsche.mp4'
import prewPorsche from '/public/img/PromotionPorschePrew.jpg'

const PromotionVideo: FC<ISideBarState> = ({ activeMenuItem }) => {
	const { videoRef, toggleVideo, fullscreen, videoTools } = usePlayer()
	return (
		<div>
			{/* @ts-ignore */}
			<Header />
			<div className={styles.dFlex}>
				{/* @ts-ignore */}
				<MenuLinks activeMenuItem={activeMenuItem} />
				<div className={homeStyle.container}>
					<div className={styles.wrapperVideo}>
						<video
							src={videoPorsche}
							ref={videoRef}
							className={styles.player}
							onClick={toggleVideo}
							poster={prewPorsche}
						/>
						<div
							className={`${styles.playerControlls} ${
								videoTools.isPlaying ? styles.hide : ''
							}`}
						>
							<button
								style={{ paddingLeft: '10px' }}
								className={styles.controlsButton}
								onClick={toggleVideo}
							>
								{videoTools.isPlaying ? <IoPause /> : <IoPlay />}
							</button>
							<div className={styles.progressBarPlayer}>
								<div
									className={styles.progressBar}
									style={{ width: `${videoTools.progress}%` }}
								></div>
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
							<button
								style={{ paddingRight: '10px' }}
								className={styles.controlsButton}
								onClick={fullscreen}
							>
								<AiOutlineFullscreen />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export { PromotionVideo }
