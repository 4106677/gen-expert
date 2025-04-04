'use client';
import Image from "next/image";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './modal.module.css';
import { useModal } from "@/context/ModalContext";
import {bbExtractor} from "@/helpers/bbExtractor";
import {useEffect, useState} from "react";
import {useLanguage} from "@/app/context";
import {useTranslation} from "react-i18next";
import {gdLink} from "@/helpers/gdLink";

export default function Modal() {
	const { showModal, setShowModal } = useModal();
	const modalClose = () => setShowModal(false);
	const { t } = useTranslation("common");

	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = 'hidden';
			document.body.style.height = '100vh';
		} else {
			document.body.style.overflow = '';
			document.body.style.height = '';
		}
		return () => {
			document.body.style.overflow = '';
			document.body.style.height = '';
		};
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

	return (
		<div className={styles.wrapper} onClick={modalClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
						{files?.length > 0 && <h2>{t("equipment.modal.files")}</h2> }
						{files?.map((file, index) => (
							<div key={index} className={styles.file}>
								<a href={gdLink(file)} target='_blank'>								<Image
									aria-hidden
									src="/doc.svg"
									alt="Document icon"
									width={30}
									height={30}
								/>Datasheet {index+1}</a>
							</div>
						))}
					</div>
				</div>
				<div className={styles.description}>
					<div className={styles.heading}>
						<h2>{showModal.manufacturer} {showModal.model}</h2>
						{/*<Image*/}
						{/*	aria-hidden*/}
						{/*	src="/doc.svg"*/}
						{/*	alt="Document icon"*/}
						{/*	width={30}*/}
						{/*	height={30}*/}
						{/*/>*/}
					<button onClick={modalClose}>x</button>
					</div>
					<ul className={styles.productDescription}>
						<li>
							<h3>{t("equipment.filters.items.power")}</h3>
							<span>{showModal.power} {showModal.powerUnit}</span>
						</li>
						<li>
							<h3>{t("equipment.filters.items.manufacturer")}</h3>
							<span>{showModal.manufacturer}</span>
						</li>
						<li><h3>{t("equipment.filters.items.voltage")}</h3>
							<span>{showModal.voltage} {showModal.voltageUnit}</span>
						</li>
						<li>
							<h3>{t("equipment.filters.items.condition")}</h3>
							<span>{showModal.condition}</span>
						</li>
						<li>
							<h3>{t("equipment.filters.items.release")}</h3>
							<span>{showModal.year}</span>
						</li>
						<li>
							<h3>{t("equipment.filters.items.price")}</h3>
							<span>{showModal.price} {showModal.priceUnit}</span>
						</li>
						<li>
							<h3>{t("equipment.filters.items.working")}</h3>
							<span><span>{showModal.hours} {showModal.hoursUnit}</span></span>
						</li>


					</ul>
					<p dangerouslySetInnerHTML={{__html: showModal.description}}/>
				</div>
			</div>
		</div>
	);
}
