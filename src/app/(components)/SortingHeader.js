// src/app/equipment/components/SortingHeader.js
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import styles from "../equipment/equipment.module.css";

export default function SortingHeader({
	                                      search,
	                                      setSearch,
	                                      selectedSorting,
	                                      setSelectedSorting,
	                                      handleResetSorting,
	                                      isFilterVisible,
	                                      toggleFilter
                                      }) {
	const { t } = useTranslation("common");

	const handleSortingChange = (event) => {
		setSelectedSorting(event.target.value);
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	// Get sorting options from translations
	const sortingValues = t("equipment.filters.items.sorting.values", { returnObjects: true });
	const sortingOptions = Object.entries(sortingValues).map(([key, label]) => ({
		value: key,
		label: label,
	}));

	return (
		<>
			<div className={styles.sortWrapper}>
				<input
					type="text"
					value={search}
					onChange={handleSearch}
					placeholder={t("equipment.filters.items.sorting.search")}
					className={`${styles.search} ${styles.sortWrapper_input}`}
				/>
				<select
					name="sorting"
					id="sorting"
					value={selectedSorting}
					onChange={handleSortingChange}
					className={styles.sortWrapper_select}
				>
					<option value="" disabled className={styles.select_disabled}>
						{t("equipment.filters.items.sorting.title")}
					</option>
					{sortingOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<button
					className={styles.sortWrapper_button}
					type='button'
					disabled={selectedSorting === '' && search === ''}
					onClick={handleResetSorting}
				>
					{t("equipment.filters.items.sorting.reset")}
				</button>
			</div>

			<button
				className={styles.mobileFilterToggle}
				onClick={toggleFilter}
			>
				<Image
					src="/filter-icon.svg"
					alt="Filter icon"
					width={24}
					height={24}
				/>
				{isFilterVisible
					? t("equipment.filters.hideFilters")
					: t("equipment.filters.showFilters")}
			</button>
		</>
	);
}