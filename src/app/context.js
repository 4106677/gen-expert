// src/app/context.js
'use client';
import { createContext, useContext, useState, useEffect } from "react";

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
	// Визначаємо мову з URL
	const getInitialLang = () => {
		if (typeof window !== "undefined") {
			const path = window.location.pathname; // Наприклад, "/ru/equipment"
			const match = path.match(/^\/(en|ru|ua)/);
			return match ? match[1] : "en"; // Якщо є збіг, повертаємо мову, інакше "en"
		}
		return "en"; // Значення за замовчуванням для SSR
	};

	const [lang, setLang] = useState(() => {
		// Спочатку перевіряємо localStorage
		const savedLang = typeof window !== "undefined" ? localStorage.getItem("language") : null;
		return savedLang || getInitialLang(); // Якщо є збережена мова, використовуємо її, інакше беремо з URL
	});

	useEffect(() => {
		localStorage.setItem("language", lang);
		import("i18next").then((i18next) => {
			i18next.changeLanguage(lang);
		});
	}, [lang]);

	return (
		<LanguageContext.Provider value={{ lang, setLang }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}