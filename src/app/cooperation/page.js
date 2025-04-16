// ./src/app/cooperation/page.js или где размещается ваш компонент
'use client'; // Необходимо для useTranslation в App Router

import React, {useEffect, useState} from "react";
import { useTranslation } from 'next-i18next'; // Или 'react-i18next'
import Link from 'next/link'; // Для ссылок Next.js
import styles from './cooperation.module.css';
import Image from "next/image";

export default function Cooperation() {
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
		<>
			<Image src="/images/cooperation_hero.png" alt="hero" width={1400} height={500} className={styles.hero_image}/>
			<div className={styles.container}>
				{/* Секция введения */}
				<section className={styles.section}>
					<h1 className={styles.mainTitle}>
						<span className={styles.icon}></span> {t('cooperation.title')}
					</h1>
					<p>{t('cooperation.intro.p1')}</p>
					<p>{t('cooperation.intro.p2')}</p>
					<p>{t('cooperation.intro.p3')}</p>
				</section>

				{/* Секция "С чего начать?" */}
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>
						<span className={styles.icon}>🔍</span> {t('cooperation.start.title')}
					</h2>
					<p>{t('cooperation.start.intro')}</p>

					<div className={styles.infoBlock}>
						<h3 className={styles.infoBlockTitle}>
							<span className={styles.icon}>📋</span> {t('cooperation.start.requestForm.title')}
						</h3>
						<ul className={styles.infoList}>
							<li>{t('cooperation.start.requestForm.companyName')}</li>
							<li>{t('cooperation.start.requestForm.businessDescription')}</li>
							<li>{t('cooperation.start.requestForm.location')}</li>
							<li>{t('cooperation.start.requestForm.sitePlan')}</li>
							<li>{t('cooperation.start.requestForm.landBoundaries')}</li>
							<li>{t('cooperation.start.requestForm.ecologyPermits')}</li>

							{/* Электроэнергетическая инфраструктура */}
							<li className={styles.subSection}>
								<h4 className={styles.subSectionTitle}>{t('cooperation.start.electrical.title')}</h4>
								<ul className={styles.infoList}>
									<li>{t('cooperation.start.electrical.point1')}</li>
									<li>{t('cooperation.start.electrical.point2')}</li>
									<li>{t('cooperation.start.electrical.point3')}</li>
									<li>{t('cooperation.start.electrical.point4')}</li>
									<li>{t('cooperation.start.electrical.point5')}</li>
									<li>{t('cooperation.start.electrical.point6')}</li>
									<li>{t('cooperation.start.electrical.point7')}</li>
									<li>{t('cooperation.start.electrical.point8')}</li>
								</ul>
							</li>

							{/* Газовая инфраструктура */}
							<li className={styles.subSection}>
								<h4 className={styles.subSectionTitle}>{t('cooperation.start.gas.title')}</h4>
								<ul className={styles.infoList}>
									<li>{t('cooperation.start.gas.point1')}</li>
									<li>{t('cooperation.start.gas.point2')}</li>
									<li>{t('cooperation.start.gas.point3')}</li>
									<li>{t('cooperation.start.gas.point4')}</li>
								</ul>
							</li>

							{/* Потребность в тепле */}
							<li className={styles.subSection}>
								<h4 className={styles.subSectionTitle}>{t('cooperation.start.heat.title')}</h4>
								<ul className={styles.infoList}>
									<li>{t('cooperation.start.heat.point1')}</li>
									<li>{t('cooperation.start.heat.point2')}</li>
									<li>{t('cooperation.start.heat.point3')}</li>
								</ul>
							</li>

							<li>{t('cooperation.start.requestForm.availableSpace')}</li>
							<li>{t('cooperation.start.requestForm.chosenGPU')}</li>
							<li>{t('cooperation.start.requestForm.contactInfo')}</li>
						</ul>
					</div>

					<p>{t('cooperation.start.submitInfo')}</p>

					<div className={styles.submitOptions}>
						{/* Замените '#' на реальный путь к файлу */}
						<a href="/cooperation.docx" download className={styles.downloadButton}>
							<span className={styles.icon}>📎</span> {t('cooperation.submit.downloadLink')}
						</a>
						<Link target='_blank' href="https://forms.gle/A3rqy1syDY3ZsJN49" className={styles.onlineButton}>
							<span className={styles.icon}>📨</span> {t('cooperation.submit.onlineLink')}
						</Link>
					</div>
				</section>

				{/* Секция "Что вы получите" */}
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>
						<span className={styles.icon}>💼</span> {t('cooperation.benefits.title')}
					</h2>
					<ul className={styles.benefitsList}>
						<li>{t('cooperation.benefits.point1')}</li>
						<li>{t('cooperation.benefits.point2')}</li>
						<li>{t('cooperation.benefits.point3')}</li>
						<li>{t('cooperation.benefits.point4')}</li>
					</ul>
				</section>

				{/* Секция призыва к действию */}
				<section className={`${styles.section} ${styles.ctaSection}`}>
					<p>
						<span className={styles.icon}>💡</span> {t('cooperation.cta.text')}
					</p>
				</section>
			</div>
		</>
			);

}