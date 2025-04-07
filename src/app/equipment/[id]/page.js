import EquipmentPage from '../page';

export default function EquipmentDetail({ params }) {
	const { id } = params;
	return <EquipmentPage modalId={id} />;
}