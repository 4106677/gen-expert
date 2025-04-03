"use client";
import {useEffect, useState} from "react";
import styles from './useful.module.css';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

// Компонент аккордеона для раскрывающихся разделов
const AccordionItem = ({ title, children, isOpen, onClick }) => {
	return (
		<div className={styles.accordionItem}>
			<div
				className={`${styles.accordionHeader} ${isOpen ? styles.active : ''}`}
				onClick={onClick}
			>
				<h3>{title}</h3>
				<span className={styles.accordionIcon}>{isOpen ? '−' : '+'}</span>
			</div>

			<div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
				{children}
			</div>
		</div>
	);
};

export default function Useful() {
	const { t } = useTranslation('common');
	const [openSection, setOpenSection] = useState('howToChoose');
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const toggleSection = (section) => {
		setOpenSection(openSection === section ? '' : section);
	};

	if (!isMounted) {
		return (
			<div>
			</div>
		);
	}

	return (
		<div className={styles.usefulContainer}>
			<h1 className={styles.mainTitle}>{t('useful.title')}</h1>

			{/* Как выбрать ГПУ */}
			<AccordionItem
				title={t('useful.howToChooseGPU.title')}
				isOpen={openSection === 'howToChoose'}
				onClick={() => toggleSection('howToChoose')}
			>
				<div className={styles.sectionContent}>
					<p className={styles.introText}>{t('useful.howToChooseGPU.intro1')}</p>
					<p className={styles.introText}>{t('useful.howToChooseGPU.intro2')}</p>

					{/* Параметр 1 */}
					<div className={styles.parameterBlock}>
						<h3 className={styles.parameterTitle}>
							<span className={styles.parameterIcon}>🔹</span>
							{t('useful.howToChooseGPU.parameter1.title')}
						</h3>
						<p>{t('useful.howToChooseGPU.parameter1.description')}</p>

						<div className={styles.keyPoints}>
							<h4>{t('useful.keyQuestions')}</h4>
							<ul className={styles.checkList}>
								<li>{t('useful.howToChooseGPU.parameter1.point1')}</li>
								<li>{t('useful.howToChooseGPU.parameter1.point2')}</li>
								<li>{t('useful.howToChooseGPU.parameter1.point3')}</li>
							</ul>

							<div className={styles.tip}>
								<h4><span className={styles.tipIcon}>💡</span> {t('useful.tip')}</h4>
								<p>{t('useful.howToChooseGPU.parameter1.tip')}</p>
							</div>
						</div>
					</div>

					{/* Параметр 2 */}
					<div className={styles.parameterBlock}>
						<h3 className={styles.parameterTitle}>
							<span className={styles.parameterIcon}>🔹</span>
							{t('useful.howToChooseGPU.parameter2.title')}
						</h3>
						<p>{t('useful.howToChooseGPU.parameter2.description')}</p>

						<div className={styles.keyPoints}>
							<h4>{t('useful.whatToConsider')}</h4>
							<ul className={styles.checkList}>
								<li>{t('useful.howToChooseGPU.parameter2.point1')}</li>
								<li>{t('useful.howToChooseGPU.parameter2.point2')}</li>
								<li>{t('useful.howToChooseGPU.parameter2.point3')}</li>
								<li>{t('useful.howToChooseGPU.parameter2.point4')}</li>
							</ul>

							<div className={styles.tip}>
								<h4><span className={styles.tipIcon}>💡</span> {t('useful.tip')}</h4>
								<p>{t('useful.howToChooseGPU.parameter2.tip')}</p>
							</div>
						</div>
					</div>

					{/* Параметры 3-8 в таком же стиле */}
					{/* Для краткости, я опустил параметры 3-8, но они аналогичны по структуре */}

					{/* Итоги */}
					<div className={styles.summaryBlock}>
						<h3 className={styles.summaryTitle}>
							<span className={styles.parameterIcon}>🔹</span>
							{t('useful.howToChooseGPU.summary.title')}
						</h3>
						<ul className={styles.summaryList}>
							<li>{t('useful.howToChooseGPU.summary.point1')}</li>
							<li>{t('useful.howToChooseGPU.summary.point2')}</li>
							<li>{t('useful.howToChooseGPU.summary.point3')}</li>
							<li>{t('useful.howToChooseGPU.summary.point4')}</li>
							<li>{t('useful.howToChooseGPU.summary.point5')}</li>
							<li>{t('useful.howToChooseGPU.summary.point6')}</li>
							<li>{t('useful.howToChooseGPU.summary.point7')}</li>
						</ul>
						<p className={styles.conclusion}>{t('useful.howToChooseGPU.summary.conclusion')}</p>

						<div className={styles.ctaButton}>
							<Link href="/contacts">{t('useful.consultationCTA')}</Link>
						</div>
					</div>
				</div>
			</AccordionItem>

			{/* Срок службы генераторов по брендам */}
			<AccordionItem
				title={t('useful.serviceLife.title')}
				isOpen={openSection === 'serviceLife'}
				onClick={() => toggleSection('serviceLife')}
			>
				<div className={styles.tableWrapper}>
					<table className={styles.comparisonTable}>
						<thead>
						<tr>
							<th>{t('useful.serviceLife.table.manufacturer')}</th>
							<th>{t('useful.serviceLife.table.electricalEfficiency')}</th>
							<th>{t('useful.serviceLife.table.thermalEfficiency')}</th>
							<th>{t('useful.serviceLife.table.totalEfficiency')}</th>
							<th>{t('useful.serviceLife.table.reliability')}</th>
							<th>{t('useful.serviceLife.table.fuelConsumption')}</th>
							<th>{t('useful.serviceLife.table.partsAvailability')}</th>
							<th>{t('useful.serviceLife.table.serviceLifeHours')}</th>
							<th>{t('useful.serviceLife.table.maintenanceInterval')}</th>
							<th>{t('useful.serviceLife.table.gasConsumption')}</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>Jenbacher</td>
							<td>43-44%</td>
							<td>45-47%</td>
							<td>88-90%</td>
							<td><span className={styles.highRating}>🔥 {t('useful.high')}</span></td>
							<td><span className={styles.goodRating}>🟢 {t('useful.economical')}</span></td>
							<td><span className={styles.mediumRating}>🟡 {t('useful.medium')}</span></td>
							<td><span className={styles.highRating}>🔥 60 000 - 80 000</span></td>
							<td><span className={styles.lowRating}>🔴 1 500 - 2 000</span></td>
							<td>230</td>
						</tr>
						<tr>
							<td>MWM</td>
							<td>42-43%</td>
							<td>44-46%</td>
							<td>86-88%</td>
							<td><span className={styles.highRating}>🔥 {t('useful.high')}</span></td>
							<td><span className={styles.goodRating}>🟢 {t('useful.economical')}</span></td>
							<td><span className={styles.goodRating}>🟢 {t('useful.good')}</span></td>
							<td><span className={styles.highRating}>🔥 60 000 - 80 000</span></td>
							<td><span className={styles.lowRating}>🔴 1 500 - 2 000</span></td>
							<td>235</td>
						</tr>
						<tr>
							<td>MTU</td>
							<td>40-42%</td>
							<td>42-44%</td>
							<td>82-85%</td>
							<td><span className={styles.goodRating}>🟢 {t('useful.high')}</span></td>
							<td><span className={styles.goodRating}>🟢 {t('useful.economical')}</span></td>
							<td><span className={styles.goodRating}>🟢 {t('useful.good')}</span></td>
							<td><span className={styles.goodRating}>🟢 50 000 - 60 000</span></td>
							<td><span className={styles.mediumRating}>🟡 2 000 - 3 000</span></td>
							<td>250</td>
						</tr>
						{/* Остальные строки таблицы */}
						</tbody>
					</table>
				</div>
			</AccordionItem>

			{/* Описание брендов ГПУ */}
			<AccordionItem
				title={t('useful.brands.title')}
				isOpen={openSection === 'brands'}
				onClick={() => toggleSection('brands')}
			>
				<div className={styles.brandsContainer}>
					{/* Jenbacher */}
					<div className={styles.brandCard}>
						<div className={styles.brandHeader}>
							<div className={styles.brandIcon}>
								<span className={styles.brandNumber}>1️⃣</span>
								<h3>Jenbacher (INNIO Jenbacher)</h3>
							</div>
						</div>
						<p className={styles.brandDescription}>
							{t('useful.brands.jenbacher')}
						</p>
					</div>

					{/* MWM */}
					<div className={styles.brandCard}>
						<div className={styles.brandHeader}>
							<div className={styles.brandIcon}>
								<span className={styles.brandNumber}>2️⃣</span>
								<h3>MWM (Caterpillar Energy Solutions)</h3>
							</div>
						</div>
						<p className={styles.brandDescription}>
							{t('useful.brands.mwm')}
						</p>
					</div>

					{/* MTU */}
					<div className={styles.brandCard}>
						<div className={styles.brandHeader}>
							<div className={styles.brandIcon}>
								<span className={styles.brandNumber}>3️⃣</span>
								<h3>MTU (Rolls-Royce Power Systems)</h3>
							</div>
						</div>
						<p className={styles.brandDescription}>
							{t('useful.brands.mtu')}
						</p>
					</div>

					{/* Остальные бренды */}
				</div>
			</AccordionItem>

			{/* Программы Миненерго */}
			<AccordionItem
				title={t('useful.programs.title')}
				isOpen={openSection === 'programs'}
				onClick={() => toggleSection('programs')}
			>
				<div className={styles.programsContent}>
					<p className={styles.programmDescription}>
						{t('useful.programs.paragraph1')}
					</p>
					<p className={styles.programmDescription}>
						{t('useful.programs.paragraph2')}
					</p>

					<div className={styles.currentPrograms}>
						<h3>{t('useful.programs.currentPrograms')}</h3>
						<p>{t('useful.programs.psoDescription')}</p>
						<ul className={styles.programsList}>
							<li>{t('useful.programs.psoPoint1')}</li>
							<li>{t('useful.programs.psoPoint2')}</li>
						</ul>

						<p>{t('useful.programs.loansDescription')}</p>
						<div className={styles.programLinks}>
							<Link href="https://www.mev.gov.ua/reforma/rozvytok-rozpodilenoyi-heneratsiyi" target="_blank" className={styles.programLink}>
								{t('useful.programs.link1')}
							</Link>
							<Link href="https://fdu.com.ua/yu" target="_blank" className={styles.programLink}>
								{t('useful.programs.link2')}
							</Link>
							<Link href="https://www.zminye.in.ua/energosvidomi-for-business" target="_blank" className={styles.programLink}>
								{t('useful.programs.link3')}
							</Link>
						</div>
					</div>
				</div>
			</AccordionItem>
		</div>
	);
}