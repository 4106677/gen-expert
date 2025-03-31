// src/app/ClientLayout.js
'use client';
import { LanguageProvider } from "./context";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import {useState} from "react";
import { ModalContext } from '@/context/ModalContext';

export default function ClientLayout({ children }) {
	const [showModal, setShowModal] = useState(false)

	return (
		<ModalContext.Provider value={{ showModal, setShowModal }}>
			<I18nextProvider i18n={i18n}>
				<LanguageProvider modal={showModal} setModal={setShowModal}>
					{children}
				</LanguageProvider>
			</I18nextProvider>
		</ModalContext.Provider>
	);
}