// src/app/equipment/page.js
'use client';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/context";
import { useModal } from "@/context/ModalContext";
import styles from "./equipment.module.css";
import { fetchGoogleSheetData } from "@/services/google";

// Import custom hooks and components
import { useEquipmentFilters } from "./hooks/useEquipmentFilters";
import { useResponsive } from "./hooks/useResponsive";
import SortingHeader from "@/app/(components)/SortingHeader";
import EquipmentFilter from "@/app/(components)/EquipmentFilter";
import ProductList from "@/app/(components)/ProductList";


export default function Equipment({ modalId }) {
	const [data, setData] = useState(null);
	const { t } = useTranslation("common");
	const { lang } = useLanguage();
	const { showModal, setShowModal } = useModal();

	// Use our custom hooks
	const { windowWidth, isFilterVisible, toggleFilter, isMounted } = useResponsive();
	const filters = useEquipmentFilters(data);

	// Handle modal open
	const handleOpenModal = (item, event) => {
		event.preventDefault();
		setShowModal(item);
	};

	// Fetch data from Google Sheets
	useEffect(() => {
		async function loadSheetData() {
			try {
				const sheetData = await fetchGoogleSheetData(lang.toUpperCase());
				setData(sheetData);
			} catch (error) {
				console.error("Failed to fetch sheet data:", error.message);
				setData([]);
			}
		}
		loadSheetData();
	}, [lang]);

	// Show loading state
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

			{/* Sorting and Search Header */}
			<SortingHeader
				search={filters.search}
				setSearch={filters.setSearch}
				selectedSorting={filters.selectedSorting}
				setSelectedSorting={filters.setSelectedSorting}
				handleResetSorting={filters.handleResetSorting}
				isFilterVisible={isFilterVisible}
				toggleFilter={toggleFilter}
			/>

			<div className={styles.container}>
				{/* Filter Sidebar */}
				<EquipmentFilter
					filters={filters}
					isFilterVisible={isFilterVisible}
					windowWidth={windowWidth}
				/>

				{/* Product List Section */}
				<div className={styles.right}>
					<ProductList
						products={filters.filterData}
						onOpenModal={handleOpenModal}
					/>
				</div>
			</div>
		</div>
	);
}