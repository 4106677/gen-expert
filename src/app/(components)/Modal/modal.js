'use client';
import Image from "next/image";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './modal.module.css';
import { useModal } from "@/context/ModalContext";
import {bbExtractor} from "@/helpers/bbExtractor";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {gdLink} from "@/helpers/gdLink";

export default function Modal() {
	// Добавляем viewport meta tag для поддержки safe area
	useEffect(() => {
		// Проверяем, есть ли уже meta viewport
		let viewportMeta = document.querySelector('meta[name="viewport"]');

		if (viewportMeta) {
			// Обновляем существующий viewport meta
			viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
		} else {
			// Создаем новый meta тег если не существует
			viewportMeta = document.createElement('meta');
			viewportMeta.name = 'viewport';
			viewportMeta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
			document.head.appendChild(viewportMeta);
		}

		// Очистка при размонтировании
		return () => {
			// Если мы создали этот тег, удаляем его
			if (!document.querySelector('meta[name="viewport"][content*="viewport-fit=cover"]')) {
				document.head.removeChild(viewportMeta);
			}
		};
	}, []);
	const { showModal, setShowModal } = useModal();
	const modalClose = () => setShowModal(false);
	const { t } = useTranslation("common");
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 980);
		};

		// Initial check
		checkIfMobile();

		// Add event listener for window resize
		window.addEventListener('resize', checkIfMobile);

		// Cleanup
		return () => window.removeEventListener('resize', checkIfMobile);
	}, []);

	useEffect(() => {
		if (showModal) {
			const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollPosition}px`;
			document.body.style.width = '100%';

			return () => {
				document.body.style.overflow = '';
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
				window.scrollTo(0, scrollPosition);
			};
		}
	}, [showModal]);
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

	const files = [
		showModal.dataSheet1,
		showModal.dataSheet2,
		showModal.dataSheet3
	].filter(Boolean);

	const CarouselComponent = () => (
		<div className={styles.carouselWrapper}>
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
					<div key={index} className={styles.sliderWrapper}>
						<img src={bbExtractor(src)} alt={`Фото ${index + 1}`} className={styles.preview}/>
					</div>
				))}
			</Carousel>
			<div className={styles.purpose}>
				<button className={styles.purpose_button} type="button">{t("equipment.modal.purpose")}</button>
			</div>
			<div className={styles.filesWrapper}>
				{files?.length > 0 && <h2 className={styles.filesWrapper_h2}>{t("equipment.modal.files")}</h2> }
				{files?.map((file, index) => (
					<div key={index} className={styles.file}>
						<a href={gdLink(file)} target='_blank' className={styles.file_a}>
							<Image
								aria-hidden
								src="/doc.svg"
								alt="Document icon"
								width={30}
								height={30}
								className={styles.file_img}
							/>Datasheet {index+1}</a>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div className={styles.wrapper} onClick={modalClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{paddingBottom: 'env(safe-area-inset-bottom, 0px)'}}>
				{isMobile ? (
					<>
						<div className={styles.heading}>
							<h2 className={styles.heading_h2}>{showModal.manufacturer} {showModal.model}</h2>
							<button onClick={modalClose} className={styles.heading_button}>x</button>
						</div>
						<div className={styles.mobileContent}>
							<ul className={styles.productDescription}>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.power")}</h3>
									<span>{showModal.power} {showModal.powerUnit}</span>
								</li>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.manufacturer")}</h3>
									<span>{showModal.manufacturer}</span>
								</li>
								<li className={styles.productDescription_li}><h3>{t("equipment.filters.items.voltage")}</h3>
									<span>{showModal.voltage} {showModal.voltageUnit}</span>
								</li>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.condition")}</h3>
									<span>{showModal.condition}</span>
								</li>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.release")}</h3>
									<span>{showModal.year}</span>
								</li>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.price")}</h3>
									<span>{showModal.price} {showModal.priceUnit}</span>
								</li>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.working")}</h3>
									<span><span>{showModal.hours} {showModal.hoursUnit}</span></span>
								</li>
							</ul>
							<CarouselComponent />
							<p dangerouslySetInnerHTML={{__html: showModal.description}} className={styles.description_p}/>
						</div>
					</>
				) : (
					<>
						<CarouselComponent />
						<div className={styles.description}>
							<div className={styles.heading}>
								<h2 className={styles.heading_h2}>{showModal.manufacturer} {showModal.model}</h2>
								<button onClick={modalClose} className={styles.heading_button}>x</button>
							</div>
							<ul className={styles.productDescription}>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.power")}</h3>
									<span>{showModal.power} {showModal.powerUnit}</span>
								</li>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.manufacturer")}</h3>
									<span>{showModal.manufacturer}</span>
								</li>
								<li className={styles.productDescription_li}><h3>{t("equipment.filters.items.voltage")}</h3>
									<span>{showModal.voltage} {showModal.voltageUnit}</span>
								</li>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.condition")}</h3>
									<span>{showModal.condition}</span>
								</li>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.release")}</h3>
									<span>{showModal.year}</span>
								</li>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.price")}</h3>
									<span>{showModal.price} {showModal.priceUnit}</span>
								</li>
								<li className={styles.productDescription_li}>
									<h3>{t("equipment.filters.items.working")}</h3>
									<span><span>{showModal.hours} {showModal.hoursUnit}</span></span>
								</li>
							</ul>
							<p dangerouslySetInnerHTML={{__html: showModal.description}} className={styles.description_p}/>
						</div>
					</>
				)}
			</div>
		</div>
	);
}