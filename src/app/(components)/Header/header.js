'use client';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styles from "./header.css";
import { useLanguage } from "@/app/context";
import "@/i18n";
import Image from "next/image";

export default function Header() {
	const { t } = useTranslation("common");
	const { lang, setLang } = useLanguage();
	const [langBox, setLangBox] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

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
						<a href="tel:+380732370045">+38(073)237-00-45</a>
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
					<Image
						aria-hidden
						src="/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/><span className="rounder">{lang.toUpperCase()}</span>
					<ul className="selector" style={{ display: langBox ? "flex" : "none" }}>
						<li onClick={(e) => onLangBoxClick(e, "ru")}>RU</li>
						<li onClick={(e) => onLangBoxClick(e, "ua")}>UA</li>
						<li onClick={(e) => onLangBoxClick(e, "en")}>EN</li>
					</ul>
				</div>
				<div className="contacts">
					<a href="tel:+380732370045">+38(073)237-00-45</a>
					<a href="mailto:info@genexpert.ua">info@genexpert.ua</a>
				</div>
			</nav>
		</header>
	);
}