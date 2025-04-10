// src/app/equipment/hooks/useEquipmentFilters.js
import { useState, useEffect } from "react";

export function useEquipmentFilters(data) {
	// Filter states
	const [filterData, setFilterData] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedSorting, setSelectedSorting] = useState("latest");

	// Range filter states
	const [filterPower, setFilterPower] = useState({ min: 0, max: 10 });
	const [powerRange, setPowerRange] = useState({ min: 0, max: 10000 });

	const [filterVoltage, setFilterVoltage] = useState({ min: 0, max: 10000 });
	const [voltageRange, setVoltageRange] = useState({ min: 0, max: 10000 });

	const [filterYear, setFilterYear] = useState({ min: 1990, max: 2025 });
	const [yearRange, setYearRange] = useState({ min: 1990, max: 2025 });

	const [filterPrice, setFilterPrice] = useState({ min: 0, max: 10000 });
	const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

	// Category filter states
	const [filterManufacturer, setFilterManufacturer] = useState([]);
	const [filterCondition, setFilterCondition] = useState([]);
	const [filterGenType, setFilterGenType] = useState([]);
	const [filterBodyType, setFilterBodyType] = useState([]);
	const [filterModel, setFilterModel] = useState([]);

	// Extract available options
	const manufacturers = [...new Set(data?.map(item => item.manufacturer) || [])];
	const conditions = [...new Set(data?.map(item => item.condition) || [])];
	const genTypes = [...new Set(data?.map(item => item.genType) || [])];
	const bodyTypes = [...new Set(data?.map(item => item.bodyType) || [])];

	// Get available models filtered by selected manufacturers
	const availableModels = [...new Set(data?.filter(item =>
		filterManufacturer.length === 0 || filterManufacturer.includes(item.manufacturer)
	).map(item => item.model) || [])];

	// Initialize ranges on data load
	useEffect(() => {
		if (!data) return;

		// Initialize data
		setFilterData(data);

		// Extract and set power range
		const powers = data
			.map((item) => Number(item.power))
			.filter((power) => !isNaN(power));
		const minPower = Math.min(...powers) || 0;
		const maxPower = Math.max(...powers) || 10000;
		setPowerRange({ min: minPower, max: maxPower });
		setFilterPower({ min: minPower, max: maxPower });

		// Extract and set voltage range
		const voltages = data
			.map((item) => Number(item.voltage))
			.filter((voltage) => !isNaN(voltage));
		const minVoltage = Math.min(...voltages) || 0;
		const maxVoltage = Math.max(...voltages) || 10000;
		setVoltageRange({ min: minVoltage, max: maxVoltage });
		setFilterVoltage({ min: minVoltage, max: maxVoltage });

		// Extract and set year range
		const years = data
			.map((item) => Number(item.year))
			.filter((year) => !isNaN(year));
		const minYear = Math.min(...years) || 0;
		const maxYear = Math.max(...years) || 10000;
		setYearRange({ min: minYear, max: maxYear });
		setFilterYear({ min: minYear, max: maxYear });

		// Extract and set price range
		const prices = data
			.map((item) => Number(item.price))
			.filter((price) => !isNaN(price));
		const minPrice = Math.min(...prices) || 0;
		const maxPrice = Math.max(...prices) || 10000;
		setPriceRange({ min: minPrice, max: maxPrice });
		setFilterPrice({ min: minPrice, max: maxPrice });
	}, [data]);

	// Apply filters when any filter changes
	useEffect(() => {
		if (!data) return;

		let filtered = data;

		// Apply category filters
		if (filterManufacturer.length > 0) {
			filtered = filtered.filter((item) => filterManufacturer.includes(item.manufacturer));
		}
		if (filterCondition.length > 0) {
			filtered = filtered.filter((item) => filterCondition.includes(item.condition));
		}
		if (filterGenType.length > 0) {
			filtered = filtered.filter((item) => filterGenType.includes(item.genType));
		}
		if (filterBodyType.length > 0) {
			filtered = filtered.filter((item) => filterBodyType.includes(item.bodyType));
		}
		if (filterModel.length > 0) {
			filtered = filtered.filter((item) => filterModel.includes(item.model));
		}

		// Apply search filter
		if (search !== '') {
			filtered = filtered.filter((item) =>
				item.description.toLowerCase().includes(search.toLowerCase()) ||
				item.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
				item.model.toLowerCase().includes(search.toLowerCase())
			);
		}

		// Apply range filters
		filtered = filtered.filter((item) => {
			const power = Number(item.power) || 0;
			const voltage = Number(item.voltage) || 0;
			const year = Number(item.year) || 0;
			const price = Number(item.price) || 0;

			return (
				power >= filterPower.min &&
				power <= filterPower.max &&
				voltage >= filterVoltage.min &&
				voltage <= filterVoltage.max &&
				year >= filterYear.min &&
				year <= filterYear.max &&
				price >= filterPrice.min &&
				price <= filterPrice.max
			);
		});

		// Apply sorting
		let sortedData = [...filtered];
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
	}, [
		data,
		filterManufacturer,
		filterCondition,
		filterModel,
		filterBodyType,
		filterGenType,
		filterPower,
		filterVoltage,
		filterYear,
		filterPrice,
		search,
		selectedSorting
	]);

	// Reset sorting and search
	const handleResetSorting = () => {
		setSelectedSorting("");
		setSearch("");
	};

	// Toggle checkbox filters
	const toggleCategoryFilter = (filterState, setFilterState, value) => {
		if (filterState.includes(value)) {
			setFilterState(filterState.filter(item => item !== value));
		} else {
			setFilterState([...filterState, value]);
		}
	};

	// Handler functions for checkbox filters
	const onManufacturerInputClick = (id) => toggleCategoryFilter(filterManufacturer, setFilterManufacturer, id);
	const onConditionInputClick = (id) => toggleCategoryFilter(filterCondition, setFilterCondition, id);
	const onGenTypeInputClick = (id) => toggleCategoryFilter(filterGenType, setFilterGenType, id);
	const onBodyTypeInputClick = (id) => toggleCategoryFilter(filterBodyType, setFilterBodyType, id);
	const onModelInputClick = (id) => toggleCategoryFilter(filterModel, setFilterModel, id);

	// Apply range filters
	const applyRangeFilter = (min, max, rangeState, setFilterState) => {
		let newMin = Math.max(rangeState.min, Math.min(Number(min), Number(max)));
		let newMax = Math.min(rangeState.max, Math.max(Number(max), Number(min)));
		setFilterState({ min: newMin, max: newMax });
	};

	// Range filter handlers
	const applyPowerFilter = (min, max) => applyRangeFilter(min, max, powerRange, setFilterPower);
	const applyVoltageFilter = (min, max) => applyRangeFilter(min, max, voltageRange, setFilterVoltage);
	const applyYearFilter = (min, max) => applyRangeFilter(min, max, yearRange, setFilterYear);
	const applyPriceFilter = (min, max) => applyRangeFilter(min, max, priceRange, setFilterPrice);

	return {
		// Data
		filterData,

		// Search & Sort
		search,
		setSearch,
		selectedSorting,
		setSelectedSorting,
		handleResetSorting,

		// Filters
		filterManufacturer,
		filterCondition,
		filterGenType,
		filterBodyType,
		filterModel,

		// Ranges
		filterPower,
		setFilterPower,
		powerRange,
		filterVoltage,
		setFilterVoltage,
		voltageRange,
		filterYear,
		setFilterYear,
		yearRange,
		filterPrice,
		setFilterPrice,
		priceRange,

		// Options
		manufacturers,
		conditions,
		genTypes,
		bodyTypes,
		availableModels,

		// Handlers
		onManufacturerInputClick,
		onConditionInputClick,
		onGenTypeInputClick,
		onBodyTypeInputClick,
		onModelInputClick,
		applyPowerFilter,
		applyVoltageFilter,
		applyYearFilter,
		applyPriceFilter
	};
}