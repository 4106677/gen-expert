'use client'
import styles from './calculator.module.css'
import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle} from "recharts";

export default function Calculator () {
	const [elecProd, setElecProd] = useState(1000)
	const [elecPrice, setElecPrice] = useState(8.5)
	const [gasPrice, setGasPrice] = useState(17.5)
	const [hourlyHeat, setHourlyHeat] = useState(10)
	const [yearlyHeat, setYearlyHeat] = useState(6)
	const [chp, setChp] = useState(false)
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation("common");
	const avg = 0.233
	const gas_gen_price = gasPrice * elecProd * avg / elecProd
	const yearly_elec_price = elecProd * elecPrice * 30 * 12 * 18
	const yearly_gen_price = elecProd * gas_gen_price * 30 * 12 * 18
	const gpu_costs = gas_gen_price * 1000 * 18 *30 * 12
	const yearly_econom = (elecPrice - gas_gen_price) * elecProd * 30 * 12 * 18
	const yearly_econom_chp = yearly_econom + 1 * elecProd * 18 * 30 * yearlyHeat
	const gpuPaybackPeriod = elecProd *300 * 44 / yearly_econom * 12
	const chpPaybackPeriod = elecProd * 320 * 44 / yearly_econom_chp * 12

	const chart_data = [
			{ name: t("calculator.estimate.title"), pv: yearly_gen_price, uv: yearly_elec_price, amt: chp ? yearly_econom_chp : yearly_econom }
		];

	useEffect(() => {
		setIsMounted(true);
	}, []);


	const handleInputChange = (field) => (e) => {
		const value = isNaN(e) ? e.target.value : e;

		switch (field) {
			case 'elecProd':
				setElecProd(value);
				break;
			case 'elecPrice':
				setElecPrice(value);
				break;
			case 'gasPrice':
				setGasPrice(value);
				break;
			case 'hourlyHeat':
				setHourlyHeat(value);
				break;
			case 'yearlyHeat':
				setYearlyHeat(value);
				break;
			default:
				break;
		}
	};

	if (!isMounted) {
		return (
			<div className={styles.main}>
				<h1>Loading...</h1>
			</div>
		);
	}


	return <div className={styles.main}>
		<div className={styles.title}>
			<h1>{t("calculator.title")}</h1>
			<h2>{t("calculator.subtitle")}</h2>
		</div>
		<div className={styles.container}>
			<div className={styles.table}>
				<ul className={styles.sliderList}>
					<li className={styles.sliderList_item}>
						<div className={styles.categoryTop}>
							<h4>{t("calculator.params.elecProd")}</h4>
							<input
								style={{ width: "130px" }}
								type="number"
								name="elecProd"
								value={elecProd}
								onChange={handleInputChange("elecProd")}
							/>
						</div>
						<div className={styles.slider_wrapper}>
							<Slider
								min={300}
								max={20000}
								value={elecProd}
								onChange={handleInputChange("elecProd")}
								step={1}
								allowCross={false}
							/>
							<div className={styles.slider_stint}>
								<span>300</span>
								<span>20000</span>
							</div>
						</div>
					</li>
					<li className={styles.sliderList_item}>
						<div className={styles.categoryTop}>
							<h4>{t("calculator.params.elecPrice")}</h4>
							<input
								type="number"
								name="elecPrice"
								// ref={inputRef}
								value={elecPrice}
								onChange={handleInputChange('elecPrice')}
							/>
						</div>
						<div className={styles.slider_wrapper}>
							<Slider
								min={2.5}
								max={15}
								value={elecPrice}
								onChange={handleInputChange('elecPrice')}
								step={0.5}
								allowCross={false}
							/>
							<div className={styles.slider_stint}>
								<span>2.5</span>
								<span>15</span>
							</div>
						</div>
					</li>
					<li className={styles.sliderList_item}>
						<div className={styles.categoryTop}>
							<h4>{t("calculator.params.gasPrice")}</h4>
							<input
								type="number"
								name="gasPrice"
								// ref={inputRef}
								value={gasPrice}
								onChange={handleInputChange('gasPrice')}
							/>
						</div>
						<div className={styles.slider_wrapper}>
							<Slider
								min={5}
								max={40}
								value={gasPrice}
								onChange={handleInputChange('gasPrice')}
								step={0.5}
								allowCross={false}
							/>
							<div className={styles.slider_stint}>
								<span>5</span>
								<span>40</span>
							</div>
						</div>
					</li>
					<li className={styles.chp_item} onClick={() => setChp(!chp)}>
						<div className={`${styles.chp_check} ${chp ? '' : styles.chp_check_disable}`} />
						<span className={styles.chp_item_span}>{t("calculator.params.chp")}</span>
					</li>
					<li className={`${styles.sliderList_item} ${chp ? '' : styles.sliderList_item_disable}`}>
						<div className={styles.categoryTop}>
							<h4 className={styles.sliderList_item_h4}>{t("calculator.params.hourlyHeat")}</h4>
							<input
								className={styles.sliderList_item_input}
								style={{ width: "130px" }}
								type="number"
								name="hourlyHeat"
								value={elecProd}
								onChange={handleInputChange('elecProd')}
							/>
						</div>
						<div className={styles.slider_wrapper}>
							<Slider
								min={300}
								max={20000}
								value={elecProd}
								onChange={handleInputChange('elecProd')}
								step={1}
								allowCross={false}
								styles={{
									rail: { backgroundColor: chp ? '' : '#ffffff40' },
									track: { backgroundColor: chp ? '' : '#ffffff40' },
									handle: { backgroundColor: chp ? '' : '#ffffff40' },
								}}
							/>
							<div className={styles.slider_stint}>
								<span className={styles.sliderList_item_span}>300</span>
								<span className={styles.sliderList_item_span}>20000</span>
							</div>
						</div>
					</li>
					<li className={`${styles.sliderList_item} ${chp ? "" : styles.sliderList_item_disable}`}>
						<div className={styles.categoryTop}>
							<h4 className={styles.sliderList_item_h4}>{t("calculator.params.yearlyHeat")}</h4>
							<input
								className={styles.sliderList_item_input}
								type="number"
								name="yearlyHeat"
								// ref={inputRef}
								value={yearlyHeat}
								onChange={handleInputChange("yearlyHeat")}
							/>
						</div>
						<div className={styles.slider_wrapper}>
							<Slider
								min={1}
								max={12}
								value={yearlyHeat}
								onChange={handleInputChange("yearlyHeat")}
								step={1}
								allowCross={false}
								styles={{
									rail: { backgroundColor: chp ? '' : '#ffffff40' },
									track: { backgroundColor: chp ? '' : '#ffffff40' },
									handle: { backgroundColor: chp ? '' : '#ffffff40' },
								}}
							/>
							<div className={styles.slider_stint}>
								<span className={styles.sliderList_item_span}>1</span>
								<span className={styles.sliderList_item_span}>12</span>
							</div>
						</div>
					</li>
				</ul>
				<div className={styles.calculated_wrapper}>
					<div className={styles.calculator}>
						<h2 className={styles.calculator_title}>{t("calculator.estimate.subtitle")}</h2>
						<ul>
							<li className={styles.calculator_list_item}>
								<h4>{t("calculator.estimate.params.gas_gen_price")}</h4>
								<span>{gas_gen_price.toFixed(3)} {t("calculator.unit.uah")}</span>
							</li>
							<li className={styles.calculator_list_item}>
								<h4>
									<div className={`${styles.rounder} `} style={{backgroundColor: "#8884d8"}}></div>
									{t("calculator.estimate.params.selfGeneration")}
								</h4>
								<span>{Math.round(yearly_gen_price).toLocaleString("ru-RU")} {t("calculator.unit.uah")}</span>
							</li>
							<li className={styles.calculator_list_item}>
								<h4>
									<div className={`${styles.rounder} `} style={{backgroundColor: "#ffc658"}}></div>
									{t("calculator.estimate.params.supplierPurchase")}
								</h4>
								<span>{yearly_elec_price.toLocaleString("ru-RU")} {t("calculator.unit.uah")}</span>
							</li>
							<li className={styles.calculator_list_item}>
								<h4>
									<div className={`${styles.rounder} `} style={{backgroundColor: "#82ca9d"}}></div>
									{t("calculator.estimate.params.annualSavings")}
								</h4>
								<span>{Math.round(chp ? yearly_econom_chp : yearly_econom).toLocaleString('ru-RU')} {t("calculator.unit.uah")}</span>
							</li>
							<li className={styles.calculator_list_item}>
								<h4>{t("calculator.estimate.params.gpuPaybackPeriod")}</h4>
								<span>{Math.round(gpuPaybackPeriod)} {t("calculator.unit.month")}</span>
							</li>
							{chp && <li className={styles.calculator_list_item}>
								<h4>{t("calculator.estimate.params.chpPaybackPeriod")}</h4>
								<span>{Math.round(chpPaybackPeriod)} {t("calculator.unit.month")}</span>
							</li>}
						</ul>
					</div>
					<ResponsiveContainer width="100%" height={300} >
						<BarChart data={chart_data}
						          width={200}
						          margin={{
							          top: 5,
							          right: 30,
							          left: 20,
							          bottom: 5,
						          }}>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							{/*<Bar dataKey="1" fill="#82E58F" activeBar={<Rectangle fill="pink" stroke="blue" />} />*/}
							{/*<Bar dataKey="2" fill="#8884d8" activeBar={<Rectangle fill="gold" stroke="purple" />} />*/}
							<Bar dataKey="pv" stackId="a" fill="#8884d8" />
							<Bar dataKey="amt" stackId="a" fill="#82ca9d" />
							<Bar dataKey="uv" fill="#ffc658" />
						</BarChart>
					</ResponsiveContainer>
					<button className={styles.contact_us}>{t("calculator.estimate.button")}</button>
				</div>
			</div>
		</div>
	</div>
}