import EquipmentPage from '../page';
import {fetchGoogleSheetData} from "@/services/google";

async function fetchData() {
	const data = await fetchGoogleSheetData(`TOP5EN`)
	return data;
}

export default function EquipmentDetail({ params }) {
	const { id } = params; // Отримуємо параметр id
	console.log('ID з маршруту:', decodeURIComponent(id)); // Виводимо в консоль
	return <EquipmentPage modalId={id} />;
}

export async function generateStaticParams() {
	const data = await fetchData(); // Отримуємо дані під часビルду

	// Припускаємо, що data.article — це масив об’єктів із полем article
	const ids = data.article?.map((item) => item.article); // Отримуємо всі значення article

	return ids.map((id) => ({
		id: encodeURIComponent(id), // Закодовуємо для URL
	}));
}