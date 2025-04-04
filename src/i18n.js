import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import i18next from "i18next";


i18next
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		supportedLngs: ["en", "ru", "ua"],
		ns: ["common"],
		defaultNS: "common",
		debug: true,
		interpolation: {
			escapeValue: false, // not needed for React
		},
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
		detection: {
			order: ["path", "localStorage", "cookie", "navigator"],
			caches: ["localStorage"],
		},
		// Optional React settings
		react: {
			useSuspense: false, // Set to false if you're having issues with SSR
		}
	});


export default i18n;