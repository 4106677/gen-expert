import data from '../../../../public/data'
import styles from './why.module.css'

export const Why = () => {
	return (
		<div className={styles.why}>
			<h2>{data.ru.why_main_page.title}</h2>
			<ul className={styles.list}>
				{data.ru.why_main_page.list.map(({id, title, text}) =>
					<li key={id} className={styles.listItem}>
						<div></div>
						<p><span>{title}</span> {text}</p>
					</li>
				)}
			</ul>
		</div>
	)
}
