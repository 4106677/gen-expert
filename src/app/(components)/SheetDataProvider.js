"use client";
import { SheetDataContext } from "@/context/SheetDataContext";

export default function SheetDataProvider({ sheetData, children }) {
	return (
		<SheetDataContext.Provider value={sheetData}>
			{children}
		</SheetDataContext.Provider>
	);
}
