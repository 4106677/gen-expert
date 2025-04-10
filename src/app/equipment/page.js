// src/app/equipment/page.js
'use client';
import Image from 'next/image';
import { fetchGoogleSheetData } from "@/services/google";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/context";
import styles from "./equipment.module.css";
import {bbExtractor} from "@/helpers/bbExtractor";
import {useModal} from "@/context/ModalContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";


export default function Equipment({ modalId }) {
	const [data, setData] = useState(null);
	const [filterData, setFilterData] = useState([])
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation("common");
	const { lang } = useLanguage();
	const { showModal, setShowModal } = useModal();

	const [search, setSearch] = useState('')

	const [filterPower, setFilterPower] = useState({min: 0, max: 10});
	const [powerRange, setPowerRange] = useState({ min: 0, max: 10000 })

	const [filterVoltage, setFilterVoltage] = useState({min: 0, max: 10000});
	const [voltageRange, setVoltageRange] = useState({ min: 0, max: 10000 })

	const [filterYear, setFilterYear] = useState({min: 1990, max: 2025});
	const [yearRange, setYearRange] = useState({min: 1990, max: 2025});

	const [filterPrice, setFilterPrice] = useState({min: 0, max: 10000});
	const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })

	const [filterManufacturer, setFilterManufacturer] = useState([])
	const [filterCondition, setFilterCondition] = useState([])
	const [filterGenType, setFilterGenType] = useState([])
	const [filterBodyType, setFilterBodyType] = useState([])
	const [filterModel, setFilterModel] = useState([])

	const [showPower, setShowPower] = useState(true)
	const [showManufacturer, setShowManufacturer] = useState(true)
	const [showModels, setShowModels] = useState(false)
	const [showVoltage, setShowVoltage] = useState(true)
	const [showCondition, setShowCondition] = useState(true)
	const [showBodyType, setShowBodyType] = useState(true)
	const [showGenType, setShowGenType] = useState(true)
	const [showYear, setShowYear] = useState(true)
	const [showPrice, setShowPrice] = useState(true)

	const manufacturers = [...new Set(data?.map(item => item.manufacturer))];
	const conditions = [...new Set(data?.map(item => item.condition))];
	const genTypes = [...new Set(data?.map(item => item.genType))];
	const bodyTypes = [...new Set(data?.map(item => item.bodyType))];
	const models = [...new Set(data?.map(item => item.model))];

	const [selectedSorting, setSelectedSorting] = useState("latest");

	const handleSortingChange = (event) => {
		setSelectedSorting(event.target.value);
	};

	const handleOpenModal = (item, event) => {
		event.preventDefault();
		setShowModal(item);
	};

	const handleResetSorting = (event) => {
		setSelectedSorting("")
		setSearch('')
	}

	const handleSearch = (event) => {
		setSearch(event.target.value)
	}

	const sortingValues = t("equipment.filters.items.sorting.values", { returnObjects: true });
	const sortingOptions = Object.entries(sortingValues).map(([key, label]) => ({
		value: key,
		label: label,
	}));

	useEffect(() => {
		setIsMounted(true);

		async function loadSheetData() {
			try {
				const sheetData = await fetchGoogleSheetData(lang.toUpperCase());
				setData(sheetData);
				setFilterData(sheetData);

				const powers = sheetData
					.map((item) => Number(item.power))
					.filter((power) => !isNaN(power));
				const minPower = Math.min(...powers) || 0;
				const maxPower = Math.max(...powers) || 10000;
				setPowerRange({ min: minPower, max: maxPower });
				setFilterPower({ min: minPower, max: maxPower });

				const voltages = sheetData
					.map((item) => Number(item.voltage))
					.filter((voltage) => !isNaN(voltage));
				const minVoltage = Math.min(...voltages) || 0;
				const maxVoltage = Math.max(...voltages) || 10000;
				setVoltageRange({ min: minVoltage, max: maxVoltage });
				setFilterVoltage({ min: minVoltage, max: maxVoltage });

				const years = sheetData
					.map((item) => Number(item.year))
					.filter((year) => !isNaN(year));
				const minYear = Math.min(...years) || 0;
				const maxYear = Math.max(...years) || 10000;
				setYearRange({ min: minYear, max: maxYear });
				setFilterYear({ min: minYear, max: maxYear });

				const prices = sheetData
					.map((item) => Number(item.price))
					.filter((price) => !isNaN(price));
				const minPrice = Math.min(...prices) || 0;
				const maxPrice = Math.max(...prices) || 10000;
				setPriceRange({ min: minPrice, max: maxPrice });
				setFilterPrice({ min: minPrice, max: maxPrice });

			} catch (error) {
				console.error("Failed to fetch sheet data:", error.message);
				setData([]);
				setFilterData([]);
			}
		}
		loadSheetData();
	}, [lang]);

	useEffect(() => {
		if (!data) return;

		let filtered = data;
		if (filterManufacturer.length > 0) {
			filtered = filtered.filter((item) => filterManufacturer.includes(item.manufacturer));
		}
		if (filterCondition.length > 0) {
			filtered = filtered.filter((item) => filterCondition.includes(item.condition));
		}
		if (filterGenType.length > 0) {
			filtered = filtered.filter((item) => filterGenType.includes(item.genType));
		}
		if (filterModel.length > 0) {
			filtered = filtered.filter((item) => filterModel.includes(item.model));
		}
		if (filterBodyType.length > 0) {
			filtered = filtered.filter((item) => filterBodyType.includes(item.bodyType));
		}
		if (search !== '') {
			filtered = filtered.filter((item) => item.description.toLowerCase().includes(search.toLowerCase()));
		}

		const filteredPower = filtered.filter((item) => {
			const power = Number(item.power) || 0;
			return power >= filterPower.min && power <= filterPower.max;
		});
		const filteredVoltage = filteredPower.filter((item) => {
			const voltage = Number(item.voltage) || 0;
			return voltage >= filterVoltage.min && voltage <= filterVoltage.max;
		})
		const filteredYear = filteredVoltage.filter((item) => {
			const year = Number(item.year) || 0;
			return year >= filterYear.min && year <= filterYear.max;
		});
		const filteredPrice = filteredYear.filter((item) => {
			const price = Number(item.price) || 0;
			return price >= filterPrice.min && price <= filterPrice.max;
		});

		let sortedData = [...filteredPrice];
		if (selectedSorting) {
			switch (selectedSorting) {
				case "priceToLow":
					sortedData.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
					break;
				case "priceToHigh":
					sortedData.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
					break;
				case "powerToLow":
					sortedData.sort((a, b) => (Number(a.power) || 0) - (Number(b.power) || 0));
					break;
				case "powerToHigh":
					sortedData.sort((a, b) => (Number(b.power) || 0) - (Number(a.power) || 0));
					break;
				case "latest":
					sortedData.reverse();
					break;
				default:
					break;
			}
		}

		setFilterData(sortedData);
	}, [filterManufacturer, filterCondition,filterModel, filterBodyType, filterGenType, filterPower, filterVoltage, filterYear, filterPrice, search, data, selectedSorting]);

	const onManufacturerInputClick = (id) => {
		if (filterManufacturer.includes(id)) {
			const filtered = filterManufacturer.filter((item) => item !== id);
			setFilterManufacturer(filtered);
		} else {
			setFilterManufacturer([...filterManufacturer, id]);
		}
	};

	const onConditionInputClick = (id) => {
		if (filterCondition.includes(id)) {
			const filtered = filterCondition.filter((item) => item !== id);
			setFilterCondition(filtered);
		} else {
			setFilterCondition([...filterCondition, id]);
		}
	};

	const onGenTypeInputClick = (id) => {
		if (filterGenType.includes(id)) {
			const filtered = filterGenType.filter((item) => item !== id);
			setFilterGenType(filtered);
		} else {
			setFilterGenType([...filterGenType, id]);
		}
	};

	const onBodyTypeInputClick = (id) => {
		if (filterBodyType.includes(id)) {
			const filtered = filterBodyType.filter((item) => item !== id);
			setFilterBodyType(filtered);
		} else {
			setFilterBodyType([...filterBodyType, id]);
		}
	};

	const onModelInputClick = (id) => {
		if (filterModel.includes(id)) {
			const filtered = filterModel.filter((item) => item !== id);
			setFilterModel(filtered);
		} else {
			setFilterModel([...filterModel, id]);
		}
	};

	useEffect(() => {
		const minInput = document.querySelector('input[name="minPower"]');
		const maxInput = document.querySelector('input[name="maxPower"]');
		if (minInput && maxInput) {
			minInput.value = filterPower.min;
			maxInput.value = filterPower.max;
		}
	}, [filterPower]);
	const applyPowerFilter = (event) => {
		event.preventDefault();
		if (!data) return;

		const minValue = event.target.elements.minPower.value || 0;
		const maxValue = event.target.elements.maxPower.value || 0;

		let newMin = Math.max(powerRange.min, Math.min(Number(minValue), Number(maxValue)));
		let newMax = Math.min(powerRange.max, Math.max(Number(maxValue), Number(minValue)));

		setFilterPower({ min: newMin, max: newMax });
	};

	useEffect(() => {
		const minInput = document.querySelector('input[name="minVoltage"]');
		const maxInput = document.querySelector('input[name="maxVoltage"]');
		if (minInput && maxInput) {
			minInput.value = filterVoltage.min;
			maxInput.value = filterVoltage.max;
		}
	}, [filterVoltage]);
	const applyVoltageFilter = (event) => {
		event.preventDefault();
		if (!data) return;

		const minValue = event.target.elements.minVoltage.value || 0;
		const maxValue = event.target.elements.maxVoltage.value || 0;

		let newMin = Math.max(voltageRange.min, Math.min(Number(minValue), Number(maxValue)));
		let newMax = Math.min(voltageRange.max, Math.max(Number(maxValue), Number(minValue)));

		setFilterVoltage({ min: newMin, max: newMax });
	};

	useEffect(() => {
		const minInput = document.querySelector('input[name="minYear"]');
		const maxInput = document.querySelector('input[name="maxYear"]');
		if (minInput && maxInput) {
			minInput.value = filterYear.min;
			maxInput.value = filterYear.max;
		}
	}, [filterYear]);
	const applyYearFilter = (event) => {
		event.preventDefault();
		if (!data) return;

		const minValue = event.target.elements.minYear.value || 0;
		const maxValue = event.target.elements.maxYear.value || 0;

		let newMin = Math.max(yearRange.min, Math.min(Number(minValue), Number(maxValue)));
		let newMax = Math.min(yearRange.max, Math.max(Number(maxValue), Number(minValue)));

		setFilterYear({ min: newMin, max: newMax });
	};

	useEffect(() => {
		const minInput = document.querySelector('input[name="minPrice"]');
		const maxInput = document.querySelector('input[name="maxPrice"]');
		if (minInput && maxInput) {
			minInput.value = filterPrice.min;
			maxInput.value = filterPrice.max;
		}
	}, [filterPrice]);
	const applyPriceFilter = (event) => {
		event.preventDefault();
		if (!data) return;

		const minValue = event.target.elements.minPrice.value || 0;
		const maxValue = event.target.elements.maxPrice.value || 0;

		let newMin = Math.max(priceRange.min, Math.min(Number(minValue), Number(maxValue)));
		let newMax = Math.min(priceRange.max, Math.max(Number(maxValue), Number(minValue)));

		setFilterPrice({ min: newMin, max: newMax });
	};

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
			<div className={styles.sortWrapper}>
				<input type="text" value={search} onChange={handleSearch} placeholder={t("equipment.filters.items.sorting.search")} className={`${styles.search} ${styles.sortWrapper_input}`}/>
				<select name="sorting" id="sorting" value={selectedSorting} onChange={handleSortingChange} className={styles.sortWrapper_select}>
					<option value="" disabled className={styles.select_disabled}>
						{t("equipment.filters.items.sorting.title")}
					</option>
					{sortingOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<button className={styles.sortWrapper_button} type='button' disabled={selectedSorting === '' && search === ''} onClick={handleResetSorting}>{t("equipment.filters.items.sorting.reset")}</button>
			</div>
			<div className={styles.container}>
				<ul className={styles.left}>
					<h2 className={styles.left_title}>{t("equipment.filters.title")}</h2>
					<li className={`${styles.left_li} ${!showPower && styles.left_li__hide}`}>
						<h3 className={styles.left_h3}
						    onClick={() => setShowPower(!showPower)}>{t("equipment.filters.items.power")}
							<Image
								aria-hidden
								src="/bottom.svg"
								alt="telegram icon"
								width={20}
								height={20}
								className={styles.h3_icon}
								style={{transform: `rotate(${showPower ? 180 : 0}deg)`}}
							/>
						</h3>
						{showPower && <div className={styles.inputFilters}>
							<form onSubmit={applyPowerFilter}>
								<div className={styles.inputs}>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="minPower"
										defaultValue={powerRange.min}
										key={`min-${powerRange.min}`}
										placeholder="Min power"
									/>
									<span className={styles.inputFilters_span}>-</span>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="maxPower"
										defaultValue={powerRange.max}
										key={`max-${powerRange.max}`}
										placeholder="Max power"
									/>
									<button type="submit" className={styles.inputFilters_button}>OK</button>
								</div>
							</form>
							<div className={styles.sliderContainer}>
								<Slider
									range
									min={powerRange.min}
									max={powerRange.max}
									value={[filterPower.min, filterPower.max]}
									onChange={(value) => {
										const [min, max] = value;
										setFilterPower({min, max});
									}}
									step={1}
									allowCross={false}
								/>
							</div>
						</div>
						}
					</li>
					<li className={`${styles.checkboxes} ${!showManufacturer && styles.left_li__hide}`}>
						<h3 className={styles.left_h3}
						    onClick={() => setShowManufacturer(!showManufacturer)}>{t("equipment.filters.items.manufacturer")}
							<Image
								aria-hidden
								src="/bottom.svg"
								alt="telegram icon"
								width={20}
								height={20}
								className={styles.h3_icon}
								style={{transform: `rotate(${showManufacturer ? 180 : 0}deg)`}}
							/>
						</h3>
						{showManufacturer && <>
							{manufacturers?.map((item, index) =>
								<div key={index}>
									<input className={styles.checkboxes_input} type="checkbox"
									       onChange={() => onManufacturerInputClick(item)}
									       checked={filterManufacturer.length === 0 || filterManufacturer.includes(item)}/>
									{item}
								</div>
							)}
						</>}
					</li>
					<li className={`${styles.checkboxes} ${!showModels && styles.left_li__hide}`}>
						<h3 className={styles.left_h3}
						    onClick={() => setShowModels(!showModels)}>{t("equipment.filters.items.model")}
							<Image
								aria-hidden
								src="/bottom.svg"
								alt="telegram icon"
								width={20}
								height={20}
								className={styles.h3_icon}
								style={{transform: `rotate(${showModels ? 180 : 0}deg)`}}
							/>
						</h3>
						{showModels && <>
							{models?.map((item, index) =>
								<div key={index}>
									<input className={styles.checkboxes_input} type="checkbox"
									       onChange={() => onModelInputClick(item)}
									       checked={filterModel.length === 0 || filterModel.includes(item)}/>
									{item}
								</div>
							)}
						</>}
					</li>
					<li className={`${styles.left_li} ${!showVoltage && styles.left_li__hide}`}>
						<h3 className={styles.left_h3}
						    onClick={() => setShowVoltage(!showVoltage)}>{t("equipment.filters.items.voltage")}
							<Image
								aria-hidden
								src="/bottom.svg"
								alt="telegram icon"
								width={20}
								height={20}
								className={styles.h3_icon}
								style={{transform: `rotate(${showVoltage ? 180 : 0}deg)`}}
							/>
						</h3>
						{showVoltage && (<div className={styles.inputFilters}>
							<form onSubmit={applyVoltageFilter}>
								<div className={styles.inputs}>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="minVoltage"
										defaultValue={voltageRange.min}
										key={`min-${voltageRange.min}`}
										placeholder="Min voltage"
									/>
									<span className={styles.inputFilters_span}>-</span>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="maxVoltage"
										defaultValue={voltageRange.max}
										key={`max-${voltageRange.max}`}
										placeholder="Max voltage"
									/>
									<button type="submit" className={styles.inputFilters_button}>OK</button>
								</div>
							</form>
							<div className={styles.sliderContainer}>
								<Slider
									range
									min={voltageRange.min}
									max={voltageRange.max}
									value={[filterVoltage.min, filterVoltage.max]}
									onChange={(value) => {
										const [min, max] = value;
										setFilterVoltage({min, max});
									}}
									step={1}
									allowCross={false}
								/>
							</div>
						</div>)}
					</li>
					<li className={`${styles.checkboxes} ${!showCondition && styles.left_li__hide}`}>
						<h3 onClick={() => setShowCondition(!showCondition)}
						    className={styles.left_h3}>{t("equipment.filters.items.condition")}
							<Image
								aria-hidden
								src="/bottom.svg"
								alt="telegram icon"
								width={20}
								height={20}
								className={styles.h3_icon}
								style={{transform: `rotate(${showCondition ? 180 : 0}deg)`}}
							/>
						</h3>
						{showCondition && (<>{conditions?.map((item, index) =>
							<div key={index}>
								<input className={styles.checkboxes_input} type="checkbox"
								       onChange={() => onConditionInputClick(item)}
								       checked={filterCondition.length === 0 || filterCondition.includes(item)}/>
								{item}
							</div>
						)}</>)}
					</li>
					<li className={`${styles.checkboxes} ${!showBodyType && styles.left_li__hide}`}>
						<h3 onClick={() => setShowBodyType(!showBodyType)}
						    className={styles.left_h3}>{t("equipment.filters.items.bodyType")}
							<Image
								aria-hidden
								src="/bottom.svg"
								alt="telegram icon"
								width={20}
								height={20}
								className={styles.h3_icon}
								style={{transform: `rotate(${showBodyType ? 180 : 0}deg)`}}
							/>
						</h3>
						{showBodyType && (<>{bodyTypes?.map((item, index) =>
							<div key={index}>
								<input className={styles.checkboxes_input} type="checkbox"
								       onChange={() => onBodyTypeInputClick(item)}
								       checked={filterBodyType.length === 0 || filterBodyType.includes(item)}/>
								{item}
							</div>
						)}</>)}
					</li>
					<li className={`${styles.checkboxes} ${!showGenType && styles.left_li__hide}`}>
						<h3 onClick={() => setShowGenType(!showGenType)}
						    className={styles.left_h3}>{t("equipment.filters.items.genType")}
							<Image
								aria-hidden
								src="/bottom.svg"
								alt="telegram icon"
								width={20}
								height={20}
								className={styles.h3_icon}
								style={{transform: `rotate(${showGenType ? 180 : 0}deg)`}}
							/>
						</h3>
						{showGenType && (<>{genTypes?.map((item, index) =>
							<div key={index}>
								<input className={styles.checkboxes_input} type="checkbox"
								       onChange={() => onGenTypeInputClick(item)}
								       checked={filterGenType.length === 0 || filterGenType.includes(item)}/>
								{item}
							</div>
						)}</>)}
					</li>
					<li className={`${styles.left_li} ${!showYear && styles.left_li__hide}`}>
						<h3 onClick={() => setShowYear(!showYear)}
						    className={styles.left_h3}>{t("equipment.filters.items.release")}
							<Image
								aria-hidden
								src="/bottom.svg"
								alt="telegram icon"
								width={20}
								height={20}
								className={styles.h3_icon}
								style={{transform: `rotate(${showYear ? 180 : 0}deg)`}}
							/>
						</h3>
						{showYear && (<div className={styles.inputFilters}>
							<form onSubmit={applyYearFilter}>
								<div className={styles.inputs}>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="minYear"
										defaultValue={yearRange.min}
										key={`min-${yearRange.min}`}
										placeholder="Min year"
									/>
									<span className={styles.inputFilters_span}>-</span>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="maxYear"
										defaultValue={yearRange.max}
										key={`max-${yearRange.max}`}
										placeholder="Max year"
									/>
									<button type="submit" className={styles.inputFilters_button}>OK</button>
								</div>
							</form>
							<div className={styles.sliderContainer}>
								<Slider
									range
									min={yearRange.min}
									max={yearRange.max}
									value={[filterYear.min, filterYear.max]}
									onChange={(value) => {
										const [min, max] = value;
										setFilterYear({min, max});
									}}
									step={1}
									allowCross={false}
								/>
							</div>
						</div>)}
					</li>
					<li className={`${styles.left_li} ${!showPrice && styles.left_li__hide}`}>
						<h3 onClick={() => setShowPrice(!showPrice)}
						    className={styles.left_h3}>{t("equipment.filters.items.price")}
							<Image
								aria-hidden
								src="/bottom.svg"
								alt="telegram icon"
								width={20}
								height={20}
								className={styles.h3_icon}
								style={{transform: `rotate(${showPrice ? 180 : 0}deg)`}}
							/>
						</h3>
						{showPrice && <div className={styles.inputFilters}>
							<form onSubmit={applyPriceFilter}>
								<div className={styles.inputs}>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="minPrice"
										defaultValue={priceRange.min}
										key={`min-${priceRange.min}`}
										placeholder="Min price"
									/>
									<span className={styles.inputFilters_span}>-</span>
									<input
										className={styles.inputFilters_input}
										type="number"
										name="maxPrice"
										defaultValue={priceRange.max}
										key={`max-${priceRange.max}`}
										placeholder="Max price"
									/>
									<button type="submit" className={styles.inputFilters_button}>OK</button>
								</div>
							</form>
							<div className={styles.sliderContainer}>
								<Slider
									range
									min={priceRange.min}
									max={priceRange.max}
									value={[filterPrice.min, filterPrice.max]}
									onChange={(value) => {
										const [min, max] = value;
										setFilterPrice({min, max});
									}}
									step={1}
									allowCross={false}
								/>
							</div>
						</div>}
					</li>

				</ul>
				<div className={styles.right}>
					<ul>
						{filterData?.map(item => (
							<li className={styles.product} key={item.article}>
								<Image onClick={(event) => handleOpenModal(item, event)} width={400} height={300}
								       className={styles.img} src={bbExtractor(item.photo1)}
								       alt={item.model}></Image>
								<div className={styles.productsSection}>
									<h3 className={styles.product_h3}>{item.manufacturer} {item.model}</h3>
									<ul className={styles.productDescription}>
										<li>{item.power} {item.powerUnit}</li>
										<li>{item.price} {item.priceUnit}</li>
										<li>{item.voltage} {item.voltageUnit}</li>
										<li>{item.condition}</li>
										<li>{item.year}</li>
										<li>{item.hours} {item.hoursUnit}</li>
									</ul>
									<p dangerouslySetInnerHTML={{__html: item.description}}
									   className={styles.productsSection_p}/>
									<button type="button" className={styles.product_button}
									        onClick={(event) => handleOpenModal(item, event)}>{t("equipment.button")}</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}