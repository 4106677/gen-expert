import styles from './about.module.css';
import Image from "next/image";
import Link from "next/link";

export const About = () => {
	return (
		<div className={styles.main}>
			<Image alt='About us image' src='https://eneraque.com/wp-content/uploads/2017/11/IMG_1488-1024x768.jpg' width={500} height={375}/>
			<div className={styles.description}>
				<h3>Мы предлагаем бизнесу в Украине доступ к новым и проверенным газопоршневым установкам от ведущих мировых производителей.</h3>
				<h4>Наш подход — это глубокая аналитика, международные связи и комплексный подбор под ваши параметры и задачи.
				</h4>
				<Link href='/about' className={styles.button}>О нас
				<Image src='./right.svg' height={40} width={40} alt='right button'/>
				</Link>
			</div>
		</div>
	)
}
