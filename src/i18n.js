// src/i18n.js
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Кастомний детектор для URL
const pathDetector = {
	name: "path",
	lookup() {
		if (typeof window !== "undefined") {
			const path = window.location.pathname;
			const match = path.match(/^\/(en|ru|ua)/);
			return match ? match[1] : undefined;
		}
		return undefined;
	},
};

i18next
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		supportedLngs: ["en", "ru", "ua"],
		ns: ["common"],
		defaultNS: "common",
		backend: {
			loadPath: (lng, ns) => {
				// console.log("i18next: loading translation for", lng, ns);
				return `/locales/${lng}/${ns}.json`;
			},
		},
		detection: {
			order: ["path", "localStorage", "cookie", "navigator"], // Додаємо path першим
			caches: ["localStorage"],
			lookupFromPathIndex: 0, // Шукаємо мову в першій частині шляху (/ru/...)
		},
		customDetectors: [pathDetector], // Додаємо кастомний детектор
		debug: true,
	});

export default i18next;