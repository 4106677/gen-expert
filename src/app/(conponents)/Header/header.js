// src/app/components/Header/header.js
import './header.css';

export default function Header() {
	return (
		<header className="header">
			<nav className="nav container">
				<img src="/images/logo.svg" alt="Logo" className="logo" />
				<ul className="nav-list">
					<li><a href="/">Головна</a></li>
					<li><a href="/products">Товари</a></li>
					<li><a href="/contacts">Контакти</a></li>
					<li><a href="/calculator">Калькулятор</a></li>
				</ul>
			</nav>
		</header>
	);
}