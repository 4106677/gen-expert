import styles from "./footer.module.css";
import Image from "next/image";

// Добавлен дополнительный параметр className для возможности добавления классов
export const Footer = ({ className }) => {
	return (
		<footer className={`${styles.footer} ${className || ''}`}>
			<a href="tel:+380732370045">
				<Image
					aria-hidden
					src="/phone.svg"
					alt="phone icon"
					width={22}
					height={22}
				/>
				+38(073)237-00-45
			</a>
			<a href="mailto:info@genexpert.com.ua">
				<Image
					aria-hidden
					src="/email.svg"
					alt="email icon"
					width={22}
					height={22}
				/>
				info@genexpert.com.ua
			</a>
			<a
				href="https://t.me/genexpert_ua"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					aria-hidden
					src="/telegram.svg"
					alt="telegram icon"
					width={22}
					height={22}
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
					width={22}
					height={22}
				/>
				Instagram
			</a>
		</footer>
	)
}