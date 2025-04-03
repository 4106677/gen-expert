'use client'
import styles from './why.module.css'
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

export default function Why () {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation('common');
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	if (!isMounted) {
		return (
			<div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{t('why.title')}</h2>

			<div className={styles.benefitsList}>
				<p className={styles.benefitItem}>
					<span className={styles.icon}>{t('why.benefits.economy').split(' ')[0]}</span>
					<span>{t('why.benefits.economy').substring(t('why.benefits.economy').indexOf(' ') + 1)}</span>
				</p>
				<p className={styles.benefitItem}>
					<span className={styles.icon}>{t('why.benefits.blackouts').split(' ')[0]}</span>
					<span>{t('why.benefits.blackouts').substring(t('why.benefits.blackouts').indexOf(' ') + 1)}</span>
				</p>
				<p className={styles.benefitItem}>
					<span className={styles.icon}>{t('why.benefits.stability').split(' ')[0]}</span>
					<span>{t('why.benefits.stability').substring(t('why.benefits.stability').indexOf(' ') + 1)}</span>
				</p>
				<p className={styles.benefitItem}>
					<span className={styles.icon}>{t('why.benefits.efficiency').split(' ')[0]}</span>
					<span>{t('why.benefits.efficiency').substring(t('why.benefits.efficiency').indexOf(' ') + 1)}</span>
				</p>
				<p className={styles.benefitItem}>
					<span className={styles.icon}>{t('why.benefits.profitability').split(' ')[0]}</span>
					<span>{t('why.benefits.profitability').substring(t('why.benefits.profitability').indexOf(' ') + 1)}</span>
				</p>
				<p className={styles.benefitItem}>
					<span className={styles.icon}>{t('why.benefits.lowCost').split(' ')[0]}</span>
					<span>{t('why.benefits.lowCost').substring(t('why.benefits.lowCost').indexOf(' ') + 1)}</span>
				</p>
				<p className={styles.benefitItem}>
					<span className={styles.icon}>{t('why.benefits.stableCost').split(' ')[0]}</span>
					<span>{t('why.benefits.stableCost').substring(t('why.benefits.stableCost').indexOf(' ') + 1)}</span>
				</p>
				<p className={styles.benefitItem}>
					<span className={styles.icon}>{t('why.benefits.cogeneration').split(' ')[0]}</span>
					<span>{t('why.benefits.cogeneration').substring(t('why.benefits.cogeneration').indexOf(' ') + 1)}</span>
				</p>
				<p className={styles.benefitItem}>
					<span className={styles.icon}>{t('why.benefits.solution').split(' ')[0]}</span>
					<span>{t('why.benefits.solution').substring(t('why.benefits.solution').indexOf(' ') + 1)}</span>
				</p>
			</div>

			<div className={styles.bestForSection}>
				<h3 className={styles.bestForTitle}>{t('why.bestFor.title')}</h3>
				<ul className={styles.bestForList}>
					<li className={styles.bestForItem}>
						<span className={styles.icon}>{t('why.bestFor.industrial').split(' ')[0]}</span>
						{t('why.bestFor.industrial').substring(t('why.bestFor.industrial').indexOf(' ') + 1)}
					</li>
					<li className={styles.bestForItem}>
						<span className={styles.icon}>{t('why.bestFor.business').split(' ')[0]}</span>
						{t('why.bestFor.business').substring(t('why.bestFor.business').indexOf(' ') + 1)}
					</li>
					<li className={styles.bestForItem}>
						<span className={styles.icon}>{t('why.bestFor.trade').split(' ')[0]}</span>
						{t('why.bestFor.trade').substring(t('why.bestFor.trade').indexOf(' ') + 1)}
					</li>
					<li className={styles.bestForItem}>
						<span className={styles.icon}>{t('why.bestFor.medical').split(' ')[0]}</span>
						{t('why.bestFor.medical').substring(t('why.bestFor.medical').indexOf(' ') + 1)}
					</li>
					<li className={styles.bestForItem}>
						<span className={styles.icon}>{t('why.bestFor.greenhouse').split(' ')[0]}</span>
						{t('why.bestFor.greenhouse').substring(t('why.bestFor.greenhouse').indexOf(' ') + 1)}
					</li>
				</ul>
			</div>

			<div className={styles.accordionContainer}>
				<button
					onClick={toggleAccordion}
					className={styles.accordionButton}
				>
					<div className={styles.accordionTitle}>
						{t('why.savings.title')}
					</div>
					<span className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ''}`}>
            ▼
          </span>
				</button>

				{isOpen && (
					<div className={styles.accordionContent}>
						<p className={styles.paragraph}>
							{t('why.savings.intro')}
						</p>
						<p className={styles.paragraph}>
							{t('why.savings.solution')}
						</p>

						<h4 className={styles.comparisonTitle}>{t('why.savings.comparison')}</h4>

						<div className={styles.tableContainer}>
							<table className={styles.table}>
								<thead className={styles.tableHeader}>
								<tr>
									<th className={styles.tableHeaderCell}>{t('why.savings.table.parameter')}</th>
									<th className={styles.tableHeaderCell}>{t('why.savings.table.grid')}</th>
									<th className={styles.tableHeaderCell}>{t('why.savings.table.gpu')}</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td className={styles.tableCell}>{t('why.savings.table.pricePerKWh')}</td>
									<td className={styles.tableCell}>9 грн</td>
									<td className={styles.tableCell}>4,63 грн</td>
								</tr>
								<tr>
									<td className={styles.tableCell}>{t('why.savings.table.monthlyExpenses')}</td>
									<td className={styles.tableCell}>6,57 млн грн</td>
									<td className={styles.tableCell}>3,38 млн грн</td>
								</tr>
								<tr>
									<td className={styles.tableCell}>{t('why.savings.table.yearlyExpenses')}</td>
									<td className={styles.tableCell}>78,84 млн грн</td>
									<td className={styles.tableCell}>40,52 млн грн</td>
								</tr>
								<tr>
									<td className={styles.tableCell}>{t('why.savings.table.monthlySavings')}</td>
									<td className={styles.tableCell}>-</td>
									<td className={styles.tableCell}>3,19 млн грн</td>
								</tr>
								<tr>
									<td className={styles.tableCell}>{t('why.savings.table.yearlySavings')}</td>
									<td className={styles.tableCell}>-</td>
									<td className={styles.tableCell}>38,33 млн грн</td>
								</tr>
								</tbody>
							</table>
						</div>

						<p className={styles.conclusion}>{t('why.savings.conclusion')}</p>

						<h4 className={styles.paybackTitle}>{t('why.savings.payback.title')}</h4>
						<ul className={styles.paybackList}>
							<li className={styles.paybackItem}>
								<span className={styles.icon}>{t('why.savings.payback.price').split(' ')[0]}</span>
								<span>{t('why.savings.payback.price').substring(t('why.savings.payback.price').indexOf(' ') + 1)}</span>
							</li>
							<li className={styles.paybackItem}>
								<span className={styles.icon}>{t('why.savings.payback.period').split(' ')[0]}</span>
								<span>{t('why.savings.payback.period').substring(t('why.savings.payback.period').indexOf(' ') + 1)}</span>
							</li>
							<li className={styles.paybackItem}>
								<span className={styles.icon}>{t('why.savings.payback.afterPayback').split(' ')[0]}</span>
								<span>{t('why.savings.payback.afterPayback').substring(t('why.savings.payback.afterPayback').indexOf(' ') + 1)}</span>
							</li>
						</ul>

						<div className={styles.noBlackoutsBox}>
							<h4 className={styles.noBlackoutsTitle}>{t('why.savings.noBlackouts.title')}</h4>
							<p className={styles.paragraph}>
								{t('why.savings.noBlackouts.description')}
							</p>
							<p className={styles.noBlackoutsQuestion}>
								{t('why.savings.noBlackouts.question')}
							</p>
						</div>

						<div className={styles.ctaContainer}>
							<button className={styles.ctaButton}>
								{t('why.savings.cta')}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
