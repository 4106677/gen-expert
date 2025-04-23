import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './industries.module.css';

const Industries = () => {
	const { t } = useTranslation('common');
	const [activeMobileRow, setActiveMobileRow] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const industryKeys = Object.keys(t('industries', { returnObjects: true }))
		.filter(key => key !== 'benefitLabel' && key !== 'advantagesLabel');
	const rowCount = 5;

	const renderIndustryCard = (industryKey) => {
		const industry = t(`industries.${industryKey}`, { returnObjects: true });

		if (!industry) return null;

		return (
			<div className={styles.card} key={industryKey}>
				<div className={styles.cardHeader}>
					<div className={styles.iconContainer}>
						<span className={styles.icon}>{industry.icon}</span>
					</div>
					<h3 className={styles.title}>{industry.title}</h3>
				</div>
				<p className={styles.description}>{industry.description}</p>

				<div className={styles.subsectors}>
					{industry.subsectors?.map((subsector, index) => (
						<div className={styles.subsector} key={index}>
							• {subsector}
						</div>
					))}
				</div>

				<div className={styles.benefit}>
					<strong>{t('industries.benefitLabel')}</strong> {industry.benefit}
				</div>

				<div className={styles.advantages}>
					<strong>{t('industries.advantagesLabel')}</strong> {industry.advantages}
				</div>
			</div>
		);
	};

	// Render all rows for desktop, or active row for mobile
	const renderContent = () => {
		if (isMobile) {
			// On mobile, show only 3 industries at a time (one "row" as a column)
			const startIndex = activeMobileRow * 3;
			const visibleKeys = industryKeys.slice(startIndex, startIndex + 3);

			return (
				<div className={styles.mobileRow}>
					{visibleKeys.map(key => renderIndustryCard(key))}
				</div>
			);
		} else {
			// On desktop, render all 5 rows with 3 industries each
			return [...Array(rowCount)].map((_, rowIndex) => {
				const startIndex = rowIndex * 3;
				const rowKeys = industryKeys.slice(startIndex, startIndex + 3);

				return (
					<div className={styles.row} key={rowIndex}>
						{rowKeys.map(key => renderIndustryCard(key))}
					</div>
				);
			});
		}
	};

	return (
		<div className={styles.container}>
			{/* Mobile navigation - only shown on mobile */}
			{isMobile && (
				<div className={styles.navigation}>
					{[...Array(rowCount)].map((_, index) => (
						<button
							key={index}
							className={`${styles.navButton} ${activeMobileRow === index ? styles.active : ''}`}
							onClick={() => setActiveMobileRow(index)}
						>
							{index + 1}
						</button>
					))}
				</div>
			)}

			<div className={styles.content}>
				<h2>{t("menu.industries_title")}</h2>
				{renderContent()}
			</div>
		</div>
	);
};

export default Industries;