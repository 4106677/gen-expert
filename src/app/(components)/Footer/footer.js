import styles from "./footer.module.css";
import Image from "next/image";

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<a href="tel:+380732370045"><Image
				aria-hidden
				src="/phone.svg"
				alt="telegram icon"
				width={20}
				height={20}
			/>
				+38(073)237-00-45</a>
			<a href="mailto:info@genexpert.ua">
				<Image
					aria-hidden
					src="/email.svg"
					alt="telegram icon"
					width={20}
					height={20}
				/>info@genexpert.ua</a>
			<a
				href="https://t.me/genexpert_ua"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					aria-hidden
					src="/telegram.svg"
					alt="telegram icon"
					width={20}
					height={20}
				/>
				Telegram
			</a>
			<a
				href="https://www.instagram.com/genexpert_ua/?igsh=ZDVkdmIzNmIyM2d1&utm_source=qr#"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					aria-hidden
					src="/instagram.svg"
					alt="instagram icon"
					width={20}
					height={20}
				/>
				Instagram
			</a>
		</footer>
	)
}
