'use client'
import { useTranslation } from "react-i18next";
import { useContactsModal } from "@/context/ContactsModalContext";
import styles from './contactsModal.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export const ContactsModal = () => {
	const { t } = useTranslation('common');
	const { showContactsModal, setContactsShowModal } = useContactsModal();
	const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

	const initialValues = {
		fullName: '',
		companyName: '',
		contactPhone: '',
		workEmail: '',
		comment: '',
		model: showContactsModal || '', // Скрытое поле для модели
	};

	const validationSchema = Yup.object({
		fullName: Yup.string().required(t('contactsModal.required')),
		companyName: Yup.string().required(t('contactsModal.required')),
		contactPhone: Yup.string().required(t('contactsModal.required')),
		workEmail: Yup.string().email(t('contactsModal.invalidEmail')).required(t('contactsModal.required')),
		comment: Yup.string(),
	});

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			setSubmitStatus(null);
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Ошибка при отправке формы');
			}

			setSubmitStatus('success');
			resetForm();

			setTimeout(() => {
				setContactsShowModal(false);
				setSubmitStatus(null);
			}, 2000);

		} catch (error) {
			console.error('Ошибка при отправке формы:', error);
			setSubmitStatus('error');
		} finally {
			setSubmitting(false);
		}
	};

	if (!showContactsModal) return null;

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>{t('contactsModal.contactUs')}</h2>
					<button
						type="button"
						className={styles.closeButton}
						onClick={() => setContactsShowModal(false)}
						aria-label={t('contactsModal.close')}
					>
						<FaTimes />
					</button>
				</div>

				{submitStatus === 'success' && (
					<div className={styles.successMessage}>
						{t('contactsModal.formSubmissionSuccess')}
					</div>
				)}

				{submitStatus === 'error' && (
					<div className={styles.errorMessage}>
						{t('contactsModal.formSubmissionError')}
					</div>
				)}

				{submitStatus !== 'success' && (
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form className={styles.form}>
								<div className={styles.formGroup}>
									<label htmlFor="fullName" className={styles.label}>
										{t('contactsModal.fullName')}
									</label>
									<Field
										type="text"
										id="fullName"
										name="fullName"
										className={styles.input}
										placeholder={t('contactsModal.enterFullName')}
									/>
									<ErrorMessage name="fullName" component="div" className={styles.error} />
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="companyName" className={styles.label}>
										{t('contactsModal.companyName')}
									</label>
									<Field
										type="text"
										id="companyName"
										name="companyName"
										className={styles.input}
										placeholder={t('contactsModal.enterCompanyName')}
									/>
									<ErrorMessage name="companyName" component="div" className={styles.error} />
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="contactPhone" className={styles.label}>
										{t('contactsModal.contactPhone')}
									</label>
									<Field
										type="tel"
										id="contactPhone"
										name="contactPhone"
										className={styles.input}
										placeholder={t('contactsModal.enterContactPhone')}
									/>
									<ErrorMessage name="contactPhone" component="div" className={styles.error} />
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="workEmail" className={styles.label}>
										{t('contactsModal.email')}
									</label>
									<Field
										type="email"
										id="workEmail"
										name="workEmail"
										className={styles.input}
										placeholder={t('contactsModal.enterWorkEmail')}
									/>
									<ErrorMessage name="workEmail" component="div" className={styles.error} />
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="comment" className={styles.label}>
										{t('contactsModal.comment')}
									</label>
									<Field
										as="textarea"
										id="comment"
										name="comment"
										className={styles.textarea}
										placeholder={t('contactsModal.enterComment')}
									/>
									<ErrorMessage name="comment" component="div" className={styles.error} />
								</div>

								{/* Скрытое поле для модели */}
								<Field type="hidden" name="model" />

								<div className={styles.buttonGroup}>
									<button
										type="button"
										className={styles.cancelButton}
										onClick={() => setContactsShowModal(false)}
									>
										{t('contactsModal.cancel')}
									</button>
									<button
										type="submit"
										className={styles.submitButton}
										disabled={isSubmitting}
									>
										{isSubmitting ? t('contactsModal.submitting') : t('contactsModal.submit')}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				)}
			</div>
		</div>
	);
}