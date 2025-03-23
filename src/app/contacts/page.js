// src/app/contacts/page.js
import './contacts.css';

export default function Contacts() {
	return (
		<div className="contacts">
			<h1>Контакти</h1>
			<p>Зв'яжіться з нами:</p>
			<ul className="contacts-list">
				<li>Телефон: <a href="tel:+380123456789">+380 123 456 789</a></li>
				<li>Email: <a href="mailto:info@example.com">info@example.com</a></li>
				<li>Адреса: м. Київ, вул. Прикладна, 1</li>
			</ul>
		</div>
	);
}