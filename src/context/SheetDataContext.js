"use client";
import { createContext, useContext } from "react";

export const SheetDataContext = createContext(null);
export const useSheetData = () => useContext(SheetDataContext);
