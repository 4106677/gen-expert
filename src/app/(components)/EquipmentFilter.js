// src/app/equipment/components/EquipmentFilter.js
import { useState, useEffect } from "react";
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "../equipment/equipment.module.css";

export default function EquipmentFilter({
	                                        filters,
	                                        isFilterVisible,
	                                        windowWidth
                                        }) {
	const { t } = useTranslation("common");

	// Initialize visibility states
	const [showStates, setShowStates] = useState({
		power: true,
		manufacturer: true,
		models: false,
		voltage: true,
		condition: true,
		bodyType: true,
		genType: true,
		year: true,
		price: true
	});

	// Determine if we're on mobile view
	const isMobile = windowWidth < 1250;

	// Set all filters to visible on mobile view and handle resize
	useEffect(() => {
		if (isMobile) {
			setShowStates({
				power: true,
				manufacturer: true,
				models: true,
				voltage: true,
				condition: true,
				bodyType: true,
				genType: true,
				year: true,
				price: true
			});
		}
	}, [isMobile, windowWidth]); // Add windowWidth to dependencies to handle resizing

	// Toggle handlers for filter sections
	const toggleFilterSection = (section) => {
		if (!isMobile) {
			setShowStates(prev => ({ ...prev, [section]: !prev[section] }));
		}
	};

	return (
		<ul className={`${styles.left} ${isFilterVisible ? styles.visible : ''}`}>
			<h2 className={styles.left_title}>{t("equipment.filters.title")}</h2>

			{/* Power Filter */}
			<li className={`${styles.left_li} ${!showStates.power && styles.left_li__hide} ${styles.filter_power}`}>
				<h3
					className={styles.left_h3}
					onClick={() => toggleFilterSection('power')}
				>
					{t("equipment.filters.items.power")}
					{!isMobile && (
						<Image
							aria-hidden
							src="/bottom.svg"
							alt="Arrow icon"
							width={20}
							height={20}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.power ? 180 : 0}deg)`}}
						/>
					)}
				</h3>
				{showStates.power && (
					<div className={styles.inputFilters}>
						<form onSubmit={(e) => {
							e.preventDefault();
							filters.applyPowerFilter(
								e.target.elements.minPower.value,
								e.target.elements.maxPower.value
							);
						}}>
							<div className={styles.inputs}>
								<input
									className={styles.inputFilters_input}
									type="number"
									name="minPower"
									defaultValue={filters.powerRange.min}
									key={`min-${filters.powerRange.min}`}
									placeholder="Min power"
								/>
								<span className={styles.inputFilters_span}>-</span>
								<input
									className={styles.inputFilters_input}
									type="number"
									name="maxPower"
									defaultValue={filters.powerRange.max}
									key={`max-${filters.powerRange.max}`}
									placeholder="Max power"
								/>
								<button type="submit" className={styles.inputFilters_button}>OK</button>
							</div>
						</form>
						<div className={styles.sliderContainer}>
							<Slider
								range
								min={filters.powerRange.min}
								max={filters.powerRange.max}
								value={[filters.filterPower.min, filters.filterPower.max]}
								onChange={(value) => {
									const [min, max] = value;
									filters.setFilterPower({min, max});
								}}
								step={1}
								allowCross={false}
							/>
						</div>
					</div>
				)}
			</li>

			{/* Manufacturer Filter */}
			<li className={`${styles.checkboxes} ${!showStates.manufacturer && styles.left_li__hide} ${styles.filter_manufacturer}`}>
				<h3
					className={styles.left_h3}
					onClick={() => toggleFilterSection('manufacturer')}
				>
					{t("equipment.filters.items.manufacturer")}
					{!isMobile && (
						<Image
							aria-hidden
							src="/bottom.svg"
							alt="Arrow icon"
							width={20}
							height={20}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.manufacturer ? 180 : 0}deg)`}}
						/>
					)}
				</h3>
				{showStates.manufacturer && (
					<>
						{filters.manufacturers.map((item, index) => (
							<div key={index} className={styles.left_input__text}>
								<input
									className={styles.checkboxes_input}
									type="checkbox"
									onChange={() => filters.onManufacturerInputClick(item)}
									checked={filters.filterManufacturer.includes(item)}
								/>
								{item}
							</div>
						))}
					</>
				)}
			</li>

			{/* Model Filter - Filtered by selected manufacturers */}
			<li className={`${styles.checkboxes} ${!showStates.models && styles.left_li__hide} ${styles.filter_model}`}>
				<h3
					className={styles.left_h3}
					onClick={() => toggleFilterSection('models')}
				>
					{t("equipment.filters.items.model")}
					{!isMobile && (
						<Image
							aria-hidden
							src="/bottom.svg"
							alt="Arrow icon"
							width={20}
							height={20}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.models ? 180 : 0}deg)`}}
						/>
					)}
				</h3>
				{showStates.models && (
					<>
						{filters.availableModels.map((item, index) => (
							<div key={index} className={styles.left_input__text}>
								<input
									className={styles.checkboxes_input}
									type="checkbox"
									onChange={() => filters.onModelInputClick(item)}
									checked={filters.filterModel.includes(item)}
								/>
								{item}
							</div>
						))}
					</>
				)}
			</li>

			{/* Voltage Filter */}
			<li className={`${styles.left_li} ${!showStates.voltage && styles.left_li__hide} ${styles.filter_voltage}`}>
				<h3
					className={styles.left_h3}
					onClick={() => toggleFilterSection('voltage')}
				>
					{t("equipment.filters.items.voltage")}
					{!isMobile && (
						<Image
							aria-hidden
							src="/bottom.svg"
							alt="Arrow icon"
							width={20}
							height={20}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.voltage ? 180 : 0}deg)`}}
						/>
					)}
				</h3>
				{showStates.voltage && (
					<div className={styles.inputFilters}>
						<form onSubmit={(e) => {
							e.preventDefault();
							filters.applyVoltageFilter(
								e.target.elements.minVoltage.value,
								e.target.elements.maxVoltage.value
							);
						}}>
							<div className={styles.inputs}>
								<input
									className={styles.inputFilters_input}
									type="number"
									name="minVoltage"
									defaultValue={filters.voltageRange.min}
									key={`min-${filters.voltageRange.min}`}
									placeholder="Min voltage"
								/>
								<span className={styles.inputFilters_span}>-</span>
								<input
									className={styles.inputFilters_input}
									type="number"
									name="maxVoltage"
									defaultValue={filters.voltageRange.max}
									key={`max-${filters.voltageRange.max}`}
									placeholder="Max voltage"
								/>
								<button type="submit" className={styles.inputFilters_button}>OK</button>
							</div>
						</form>
						<div className={styles.sliderContainer}>
							<Slider
								range
								min={filters.voltageRange.min}
								max={filters.voltageRange.max}
								value={[filters.filterVoltage.min, filters.filterVoltage.max]}
								onChange={(value) => {
									const [min, max] = value;
									filters.setFilterVoltage({min, max});
								}}
								step={1}
								allowCross={false}
							/>
						</div>
					</div>
				)}
			</li>

			{/* Condition Filter */}
			<li className={`${styles.checkboxes} ${!showStates.condition && styles.left_li__hide} ${styles.filter_condition}`}>
				<h3
					className={styles.left_h3}
					onClick={() => toggleFilterSection('condition')}
				>
					{t("equipment.filters.items.condition")}
					{!isMobile && (
						<Image
							aria-hidden
							src="/bottom.svg"
							alt="Arrow icon"
							width={20}
							height={20}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.condition ? 180 : 0}deg)`}}
						/>
					)}
				</h3>
				{showStates.condition && (
					<>
						{filters.conditions.map((item, index) => (
							<div key={index} className={styles.left_input__text}>
								<input
									className={styles.checkboxes_input}
									type="checkbox"
									onChange={() => filters.onConditionInputClick(item)}
									checked={filters.filterCondition.includes(item)}
								/>
								{item}
							</div>
						))}
					</>
				)}
			</li>

			{/* Body Type Filter */}
			<li className={`${styles.checkboxes} ${!showStates.bodyType && styles.left_li__hide} ${styles.filter_bodyType}`}>
				<h3
					className={styles.left_h3}
					onClick={() => toggleFilterSection('bodyType')}
				>
					{t("equipment.filters.items.bodyType")}
					{!isMobile && (
						<Image
							aria-hidden
							src="/bottom.svg"
							alt="Arrow icon"
							width={20}
							height={20}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.bodyType ? 180 : 0}deg)`}}
						/>
					)}
				</h3>
				{showStates.bodyType && (
					<>
						{filters.bodyTypes.map((item, index) => (
							<div key={index} className={styles.left_input__text}>
								<input
									className={styles.checkboxes_input}
									type="checkbox"
									onChange={() => filters.onBodyTypeInputClick(item)}
									checked={filters.filterBodyType.includes(item)}
								/>
								{item}
							</div>
						))}
					</>
				)}
			</li>

			{/* Generator Type Filter */}
			<li className={`${styles.checkboxes} ${!showStates.genType && styles.left_li__hide} ${styles.filter_genType}`}>
				<h3
					className={styles.left_h3}
					onClick={() => toggleFilterSection('genType')}
				>
					{t("equipment.filters.items.genType")}
					{!isMobile && (
						<Image
							aria-hidden
							src="/bottom.svg"
							alt="Arrow icon"
							width={20}
							height={20}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.genType ? 180 : 0}deg)`}}
						/>
					)}
				</h3>
				{showStates.genType && (
					<>
						{filters.genTypes.map((item, index) => (
							<div key={index} className={styles.left_input__text}>
								<input
									className={styles.checkboxes_input}
									type="checkbox"
									onChange={() => filters.onGenTypeInputClick(item)}
									checked={filters.filterGenType.includes(item)}
								/>
								{item}
							</div>
						))}
					</>
				)}
			</li>

			{/* Year Filter */}
			<li className={`${styles.left_li} ${!showStates.year && styles.left_li__hide} ${styles.filter_year}`}>
				<h3
					className={styles.left_h3}
					onClick={() => toggleFilterSection('year')}
				>
					{t("equipment.filters.items.release")}
					{!isMobile && (
						<Image
							aria-hidden
							src="/bottom.svg"
							alt="Arrow icon"
							width={20}
							height={20}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.year ? 180 : 0}deg)`}}
						/>
					)}
				</h3>
				{showStates.year && (
					<div className={styles.inputFilters}>
						<form onSubmit={(e) => {
							e.preventDefault();
							filters.applyYearFilter(
								e.target.elements.minYear.value,
								e.target.elements.maxYear.value
							);
						}}>
							<div className={styles.inputs}>
								<input
									className={styles.inputFilters_input}
									type="number"
									name="minYear"
									defaultValue={filters.yearRange.min}
									key={`min-${filters.yearRange.min}`}
									placeholder="Min year"
								/>
								<span className={styles.inputFilters_span}>-</span>
								<input
									className={styles.inputFilters_input}
									type="number"
									name="maxYear"
									defaultValue={filters.yearRange.max}
									key={`max-${filters.yearRange.max}`}
									placeholder="Max year"
								/>
								<button type="submit" className={styles.inputFilters_button}>OK</button>
							</div>
						</form>
						<div className={styles.sliderContainer}>
							<Slider
								range
								min={filters.yearRange.min}
								max={filters.yearRange.max}
								value={[filters.filterYear.min, filters.filterYear.max]}
								onChange={(value) => {
									const [min, max] = value;
									filters.setFilterYear({min, max});
								}}
								step={1}
								allowCross={false}
							/>
						</div>
					</div>
				)}
			</li>

			{/* Price Filter */}
			<li className={`${styles.left_li} ${!showStates.price && styles.left_li__hide} ${styles.filter_price}`}>
				<h3
					className={styles.left_h3}
					onClick={() => toggleFilterSection('price')}
				>
					{t("equipment.filters.items.price")}
					{!isMobile && (
						<Image
							aria-hidden
							src="/bottom.svg"
							alt="Arrow icon"
							width={20}
							height={20}
							className={styles.h3_icon}
							style={{transform: `rotate(${showStates.price ? 180 : 0}deg)`}}
						/>
					)}
				</h3>
				{showStates.price && (
					<div className={styles.inputFilters}>
						<form onSubmit={(e) => {
							e.preventDefault();
							filters.applyPriceFilter(
								e.target.elements.minPrice.value,
								e.target.elements.maxPrice.value
							);
						}}>
							<div className={styles.inputs}>
								<input
									className={styles.inputFilters_input}
									type="number"
									name="minPrice"
									defaultValue={filters.priceRange.min}
									key={`min-${filters.priceRange.min}`}
									placeholder="Min price"
								/>
								<span className={styles.inputFilters_span}>-</span>
								<input
									className={styles.inputFilters_input}
									type="number"
									name="maxPrice"
									defaultValue={filters.priceRange.max}
									key={`max-${filters.priceRange.max}`}
									placeholder="Max price"
								/>
								<button type="submit" className={styles.inputFilters_button}>OK</button>
							</div>
						</form>
						<div className={styles.sliderContainer}>
							<Slider
								range
								min={filters.priceRange.min}
								max={filters.priceRange.max}
								value={[filters.filterPrice.min, filters.filterPrice.max]}
								onChange={(value) => {
									const [min, max] = value;
									filters.setFilterPrice({min, max});
								}}
								step={1}
								allowCross={false}
							/>
						</div>
					</div>
				)}
			</li>
		</ul>
	);
}