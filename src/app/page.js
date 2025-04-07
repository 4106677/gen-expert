'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Why} from "@/app/(components)/Why/why";
import {About} from "@/app/(components)/About/about";
import "../i18n";
import {bbExtractor} from "@/helpers/bbExtractor";
import {fetchGoogleSheetData} from "@/services/google";
import {useEffect, useState} from "react";
import {useLanguage} from "@/app/context";
import {useModal} from "@/context/ModalContext";
import {useRouter} from "next/navigation";

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const { showModal, setShowModal } = useModal();
    const router = useRouter();
    const { lang } = useLanguage();

    useEffect(() => {
        async function loadSheetData() {
            setLoading(true)
            try {
                const sheetData = await fetchGoogleSheetData(`TOP5${lang.toUpperCase()}`);
                setData(sheetData);
            } catch (error) {
                console.error("Failed to fetch sheet data:", error.message);
                setData([]);
            }
        }

        loadSheetData().then(r => setLoading(false));
    }, [lang]);

    const handleSlideClick = (index) => {
        if (data && data[index]) {
            const item = data[index];
            if (item.article) {
                router.push(`/equipment`);
                setShowModal(item)
            } else {

            }
        } else {
            console.error(`Data is not loaded or index ${index} is out of bounds.`);
        }
    };

    const slides = data?.map((item) => ({
        image: bbExtractor(item.photo1),
        description: item,
        title: `${item.manufacturer} ${item.model}`, // Для alt тексту
    })).filter((slide) => slide.image) || [];


    return (
        <div className={styles.page}>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={4500}
                showStatus={false}
                showIndicators={false}
                showArrows={true}
                onClickItem={handleSlideClick}
                // onChange={(index) => setCurrentIndex(index)} // Відстежуємо індекс
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button type="button" className={styles.arrowStyles} onClick={onClickHandler} title={label}
                                style={{right: 15}}>
                            <Image
                                aria-hidden
                                src="/left.svg"
                                alt="Window icon"
                                width={30}
                                height={30}
                                style={{transform: "rotate(180deg)"}}
                            />
                        </button>
                    )
                }
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button type="button" className={styles.arrowStyles} onClick={onClickHandler} title={label}
                                style={{left: 15}}>
                            <Image
                                aria-hidden
                                src="/left.svg"
                                alt="Window icon"
                                width={30}
                                height={30}
                            />
                        </button>
                    )
                }
            >
                {slides.map(({image, title, description}, index) => (
                    <div key={index} className={styles.slide}>
                        <Image
                            className={styles.logo}
                            src={image}
                            alt={title}
                            width={1200}
                            height={663.75}
                            priority={index === 0}
                        />
                        <div className={styles.description}>
                            <div className={styles.details}>
                                <p>{description?.manufacturer} {description?.model}</p>
                            </div>
                            <div className={styles.details}>
                                <Image src="/power.svg" alt="power" width={20} height={20} className={styles.svg}/>
                                <p>{description?.power} {description?.powerUnit}</p>
                            </div>
                            <div className={styles.details}>
                                <Image src="/calendar.svg" alt="year" width={20} height={20} className={styles.svg}/>
                                <p>{description?.year}</p>
                            </div>

                            <div className={styles.details}>
                                <Image src="/volt.svg" alt="voltage" width={20} height={20} className={styles.svg}/>
                                <p>{description?.voltage} {description?.voltageUnit}</p>
                            </div>
                            <div className={styles.details}>
                                <Image src="/clock.svg" alt="clock" width={20} height={20} className={styles.svg}/>
                                <p>{description?.hours} {description?.hoursUnit}</p>
                            </div>
                            <div className={styles.details}>
                                <Image src="/ruler.svg" alt="condition" width={20} height={20} className={styles.svg}/>
                                <p>{description?.condition}</p>
                            </div>
                            <div className={styles.details}>
                                <Image src="/price.svg" alt="price" width={20} height={20} className={styles.svg}/>
                                <p>{description?.price} {description?.priceUnit}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
            <Why/>
            <About/>
        </div>
    );
}

