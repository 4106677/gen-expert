'use client';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './modal.module.css';
import { useModal } from "@/context/ModalContext";
import {bbExtractor} from "@/helpers/bbExtractor";
import {useEffect} from "react";

export default function Modal() {
	const { showModal, setShowModal } = useModal();
	const modalClose = () => setShowModal(false);

	useEffect(() => {
		if (showModal) {
			// Блокуємо скрол
			document.body.style.overflow = 'hidden';
			document.body.style.height = '100vh';
		} else {
			// Розблокуємо скрол
			document.body.style.overflow = '';
			document.body.style.height = '';
		}

		// Очищаємо ефект при закритті модалки
		return () => {
			document.body.style.overflow = '';
			document.body.style.height = '';
		};
	}, [showModal]);

	console.log(showModal)

	if (!showModal) return null;

	const images = [
		showModal.photo1,
		showModal.photo2,
		showModal.photo4,
		showModal.photo5,
		showModal.photo6,
		showModal.photo7,
		showModal.photo8,
		showModal.photo9,
		showModal.photo10
	].filter(Boolean);

	return (
		<div className={styles.wrapper} onClick={modalClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<Carousel
					showArrows={true}
					showThumbs={true}
					showStatus={false}
					showIndicators={false}
					infiniteLoop={true}
					useKeyboardArrows={true}
					autoPlay={false}
					emulateTouch={true}
					className={styles.carousel}
				>
					{images.map((src, index) => (
						<div key={index}>
							<img src={bbExtractor(src)} alt={`Фото ${index + 1}`} className={styles.preview}/>
						</div>
					))}
				</Carousel>
				<div className={styles.description}>
					<div className={styles.heading}>
						<h2>{showModal.manufacturer} {showModal.model}</h2>
					<button onClick={modalClose}>x</button>
					</div>
					<ul className={styles.productDescription}>
					<li>{showModal.power} {showModal.powerUnit}</li>
						<li>{showModal.manufacturer}</li>
						<li>{showModal.voltage} {showModal.voltageUnit}</li>
						<li>{showModal.condition}</li>
						<li>{showModal.year}</li>
						<li>{showModal.hours} {showModal.hoursUnit}</li>
					</ul>
					<p>{showModal.description}</p>
				</div>
			</div>
		</div>
	);
}
