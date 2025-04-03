// src/app/(components)/Header/header.js
'use client';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styles from "./header.css";
import { useLanguage } from "@/app/context";
import "@/i18n";

export default function Header() {
	const { t } = useTranslation("common");
	const { lang, setLang } = useLanguage();
	const [langBox, setLangBox] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	// Рендеримо переклади лише після монтування на клієнті
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onLangBoxClick = (event, selectedLang) => {
		event.stopPropagation();
		setLang(selectedLang);
		setLangBox(false);
		import("i18next").then((i18next) => {
			i18next.changeLanguage(selectedLang);
		});
	};

	if (!isMounted) {
		return (
			<header className="header">
				<nav className="nav container">
					<Link href="/" className="logoLink">
						<span className="logoGen">GEN</span>
						<span className="logoExpert">EXPERT</span>
					</Link>
					<ul className="nav-list">
						<li><Link href="/equipment">Loading...</Link></li>
						<li><Link href="/why">Loading...</Link></li>
						<li><Link href="/useful">Loading...</Link></li>
						<li><Link href="/calculator">Loading...</Link></li>
						<li><Link href="/cooperation">Loading...</Link></li>
					</ul>
					<div className="language">
						<span className="rounder">'EN'</span>
					</div>
					<div className="contacts">
						<a href="tel:+380987666303">+380987666303</a>
						<a href="mailto:info@genexpert.ua">info@genexpert.ua</a>
					</div>
				</nav>
			</header>
		);
	}

	return (
		<header className="header">
			<nav className="nav container">
				<Link href="/" className="logoLink">
					<span className="logoGen">GEN</span>
					<span className="logoExpert">EXPERT</span>
				</Link>
				<ul className="nav-list">
					<li><Link href="/equipment">{t("menu.equipment")}</Link></li>
					<li><Link href="/why">{t("menu.why")}</Link></li>
					<li><Link href="/useful">{t("menu.useful")}</Link></li>
					<li><Link href="/calculator">{t("menu.calculator")}</Link></li>
					<li><Link href="/cooperation">{t("menu.cooperation")}</Link></li>
				</ul>
				<div className="language" onClick={() => setLangBox(true)}>
					<span className="rounder">{lang.toUpperCase()}</span>
					<ul className="selector" style={{ display: langBox ? "flex" : "none" }}>
						<li onClick={(e) => onLangBoxClick(e, "ru")}>RU</li>
						<li onClick={(e) => onLangBoxClick(e, "ua")}>UA</li>
						<li onClick={(e) => onLangBoxClick(e, "en")}>EN</li>
					</ul>
				</div>
				<div className="contacts">
					<a href="tel:+380987666303">+380987666303</a>
					<a href="mailto:info@genexpert.ua">info@genexpert.ua</a>
				</div>
			</nav>
		</header>
	);
}