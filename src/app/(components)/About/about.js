'use client'
import styles from './about.module.css';
import Image from "next/image";
import Link from "next/link";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

export const About = () => {
	const { t } = useTranslation('common');
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div>
			</div>
		);
	}
	return (
		<div className={styles.main}>
			<Image alt='About us image' src='/images/about_us.jpeg' width={500} height={375}/>
			<div className={styles.description}>
				<h3>{t('about_main_page.title')}</h3>
				<h4>{t('about_main_page.subtitle')}
				</h4>
				<Link href='/about' className={styles.button}>О нас
				<Image src='./right.svg' height={40} width={40} alt='right button'/>
				</Link>
			</div>
		</div>
	)
}
