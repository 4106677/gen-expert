import Image from "next/image";
import back_image from '../../../public/images/backimage_about.png'
import styles from './about.module.css'

export default function About() {
	return (
		<div>
			<div className={styles.backgroundWrapper}>
				<div className={styles.blurOverlay}></div>
				</div>
		</div>
	);
}