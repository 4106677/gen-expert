// src/app/components/Header/header.js
import './header.css';
import Image from "next/image";
import Link from "next/link";

export default function Header() {
	return (
		<header className="header">
			<nav className="nav container">
				<Image height={50} width={50} src="/images/logo.svg" alt="Logo" className="logo" />
				<ul className="nav-list">
					<li><Link href="/">Головна</Link></li>
					<li><Link href="/products">Товари</Link></li>
					<li><Link href="/contacts">Контакти</Link></li>
					<li><Link href="/calculator">Калькулятор</Link></li>
				</ul>
			</nav>
		</header>
	);
}