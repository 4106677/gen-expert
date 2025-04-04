"use client";
import styles from './about.module.css';
import { useTranslation } from 'next-i18next';
import {useEffect, useState} from "react";
import { getTranslations } from 'next-intl/server';

export default  function About() {
	const { t } = useTranslation('common');
	// const t = await getTranslations('common');
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
		<div className={styles.aboutContainer}>
			<section className={styles.hero}>
				<h1 className={styles.mainTitle}>{t('about.title')}</h1>
				<p className={styles.description}>
					{t('about.description')}
				</p>
			</section>

			<section className={styles.whyChooseUs}>
				<h2 className={styles.sectionTitle}>{t('about.whyChooseUs.title')}</h2>

				<div className={styles.advantagesGrid}>
					<div className={styles.advantageCard}>
						<div className={styles.advantageIcon}>🔍</div>
						<h3 className={styles.advantageTitle}>{t('about.whyChooseUs.advantage1.title')}</h3>
						<ul className={styles.advantageList}>
							<li>{t('about.whyChooseUs.advantage1.point1')}</li>
							<li>{t('about.whyChooseUs.advantage1.point2')}</li>
						</ul>
					</div>

					<div className={styles.advantageCard}>
						<div className={styles.advantageIcon}>🌍</div>
						<h3 className={styles.advantageTitle}>{t('about.whyChooseUs.advantage2.title')}</h3>
						<ul className={styles.advantageList}>
							<li>{t('about.whyChooseUs.advantage2.point1')}</li>
							<li>{t('about.whyChooseUs.advantage2.point2')}</li>
						</ul>
					</div>

					<div className={styles.advantageCard}>
						<div className={styles.advantageIcon}>🛡</div>
						<h3 className={styles.advantageTitle}>{t('about.whyChooseUs.advantage3.title')}</h3>
						<ul className={styles.advantageList}>
							<li>{t('about.whyChooseUs.advantage3.point1')}</li>
							<li>{t('about.whyChooseUs.advantage3.point2')}</li>
						</ul>
					</div>

					<div className={styles.advantageCard}>
						<div className={styles.advantageIcon}>⚙️</div>
						<h3 className={styles.advantageTitle}>{t('about.whyChooseUs.advantage4.title')}</h3>
						<ul className={styles.advantageList}>
							<li>{t('about.whyChooseUs.advantage4.point1')}</li>
							<li>{t('about.whyChooseUs.advantage4.point2')}</li>
							<li>{t('about.whyChooseUs.advantage4.point3')}</li>
						</ul>
					</div>

					<div className={styles.advantageCard}>
						<div className={styles.advantageIcon}>💸</div>
						<h3 className={styles.advantageTitle}>{t('about.whyChooseUs.advantage5.title')}</h3>
						<ul className={styles.advantageList}>
							<li>{t('about.whyChooseUs.advantage5.point1')}</li>
							<li>{t('about.whyChooseUs.advantage5.point2')}</li>
						</ul>
					</div>

					<div className={styles.advantageCard}>
						<div className={styles.advantageIcon}>📈</div>
						<h3 className={styles.advantageTitle}>{t('about.whyChooseUs.advantage6.title')}</h3>
						<ul className={styles.advantageList}>
							<li>{t('about.whyChooseUs.advantage6.point1')}</li>
							<li>{t('about.whyChooseUs.advantage6.point2')}</li>
						</ul>
					</div>
				</div>
			</section>

			<section className={styles.mission}>
				<h2 className={styles.sectionTitle}>{t('about.mission.title')}</h2>
				<p className={styles.missionText}>{t('about.mission.description')}</p>

				<h3 className={styles.goalTitle}>{t('about.mission.goalTitle')}</h3>
				<ul className={styles.goalsList}>
					<li><span className={styles.goalIcon}>🔌</span> {t('about.mission.goal1')}</li>
					<li><span className={styles.goalIcon}>⚡</span> {t('about.mission.goal2')}</li>
					<li><span className={styles.goalIcon}>🔗</span> {t('about.mission.goal3')}</li>
					<li><span className={styles.goalIcon}>🌿</span> {t('about.mission.goal4')}</li>
					<li><span className={styles.goalIcon}>📊</span> {t('about.mission.goal5')}</li>
				</ul>
			</section>

			<section className={styles.results}>
				<h2 className={styles.sectionTitle}>{t('about.results.title')}</h2>
				<ul className={styles.resultsList}>
					<li>{t('about.results.point1')}</li>
					<li>{t('about.results.point2')}</li>
					<li>{t('about.results.point3')}</li>
					<li>{t('about.results.point4')}</li>
				</ul>

				<p className={styles.slogan}>{t('about.slogan')}</p>
			</section>
		</div>
	);
}

