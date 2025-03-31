// src/app/equipment/page.js
'use client';
import Image from 'next/image';
import { fetchGoogleSheetData } from "@/services/google";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/context";
import styles from "./equipment.module.css";
import {bbExtractor} from "@/helpers/bbExtractor";
import {useModal} from "@/context/ModalContext"; // Припускаю, що у вас є CSS-модуль

export default function Equipment() {
	const [data, setData] = useState(null);
	const [filterData, setFilterData] = useState([])
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation("common");
	const { lang } = useLanguage();
	const { showModal, setShowModal } = useModal();

	const [filterPower, setFilterPower] = useState({min: 0, max: 0});
	const [filterManufacturer, setFilterManufacturer] = useState([])
	const manufacturers = [...new Set(data?.map(item => item.manufacturer))];

	useEffect(() => {
		setIsMounted(true);

		async function loadSheetData() {
			try {
				const sheetData = await fetchGoogleSheetData(lang.toUpperCase());
				setData(sheetData);
				setFilterData(sheetData)
			} catch (error) {
				setData([]);
			}
		}
		loadSheetData()
	}, [lang]);


	useEffect(() => {
		const filtered = data?.filter(item => filterManufacturer.includes(item.manufacturer));
		setFilterData(filtered)
	}, [filterManufacturer]);

	const onManufacturerInputClick = (id) => {
		if (filterManufacturer.includes(id)) {
			const filtered = filterManufacturer.filter(item => item !== id);
			setFilterManufacturer(filtered);
		} else {
			setFilterManufacturer([...filterManufacturer, id]);
		}
	}

	// console.log(filterData)


	if (!isMounted) {
		return (
			<div className={styles.main}>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
				<div className={styles.main}>
					<h1 className={styles.title}>{t("equipment.title")}</h1>
					<div className={styles.container}>
						<ul className={styles.left}>
							<li><h3>{t("equipment.filters.items.power")}</h3></li>
							<li className={styles.manufacturer}><h3>{t("equipment.filters.items.manufacturer")}</h3>
								{manufacturers?.map((item, index) =>
									<div key={index}>
										<input type="checkbox" onChange={() => onManufacturerInputClick(item)} checked={filterManufacturer.length === 0 || filterManufacturer.includes(item)}/>
										{item}
									</div>
								)}
							</li>
							<li><h3>{t("equipment.filters.items.voltage")}</h3></li>
							<li><h3>{t("equipment.filters.items.condition")}</h3></li>
							<li><h3>{t("equipment.filters.items.release")}</h3></li>
							<li><h3>{t("equipment.filters.items.price")}</h3></li>

						</ul>
						<div className={styles.right}>
							<div>
								<input type="text"/>
								<input type="search"/>
							</div>
							<ul>
								{filterData?.map(item => (
									<li className={styles.product} key={item.article}>
										<Image width={400} height={300} className={styles.img} src={bbExtractor(item.photo1)} alt={item.model}></Image>
										<div className={styles.productsSection}>
											<h3>{item.manufacturer} {item.model}</h3>
											<ul className={styles.productDescription}>
												<li>{item.power} {item.powerUnit}</li>
												<li>{item.manufacturer}</li>
												<li>{item.voltage} {item.voltageUnit}</li>
												<li>{item.condition}</li>
												<li>{item.year}</li>
												<li>{item.hours} {item.hoursUnit}</li>
											</ul>
											<p>{item.description}</p>
											<button type='button' onClick={() => setShowModal(item)}>{t("equipment.filters.button")}</button>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
	);
}