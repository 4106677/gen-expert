import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
	try {
		console.log('API route запущен');

		// Получаем данные из запроса
		const formData = await request.json();
		console.log('Полученные данные формы:', formData);

		// Проверяем наличие переменных окружения
		if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
			console.error('Ошибка: Отсутствуют обязательные переменные окружения EMAIL_USER или EMAIL_PASSWORD');
			return NextResponse.json(
				{ error: 'Ошибка конфигурации сервера электронной почты' },
				{ status: 500 }
			);
		}

		console.log('Создаем транспорт для почты');

		// Создаем транспорт для почты
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST || 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
			debug: true, // Включаем отладку
			logger: true  // Включаем логирование
		});

		console.log('Транспорт создан, проверяем соединение');

		// Проверяем соединение
		try {
			await transporter.verify();
			console.log('Соединение с сервером успешно установлено');
		} catch (verifyError) {
			console.error('Ошибка при проверке соединения с почтовым сервером:', verifyError);
			return NextResponse.json(
				{ error: 'Не удалось подключиться к почтовому серверу' },
				{ status: 500 }
			);
		}

		const recipient = process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER;
		console.log('Отправляем письмо на адрес:', recipient);

		// Подготавливаем текст письма
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: recipient,
			subject: `Новое сообщение с сайта: ${formData.companyName || 'Контактная форма'}`,
			text: `
        Получено новое сообщение через контактную форму:
        
        ФИО: ${formData.fullName}
        Название компании: ${formData.companyName}
        Контактный номер: ${formData.contactPhone}
        Email: ${formData.workEmail}
        Модель: ${formData.model}
        
        Комментарий:
        ${formData.comment || 'Нет комментария'}
      `,
			html: `
        <h2>Получено новое сообщение через контактную форму</h2>
        <p><strong>ФИО:</strong> ${formData.fullName}</p>
        <p><strong>Название компании:</strong> ${formData.companyName}</p>
        <p><strong>Контактный номер:</strong> ${formData.contactPhone}</p>
        <p><strong>Email:</strong> ${formData.workEmail}</p>
        <p><strong>Модель:</strong> ${formData.model}</p>
        <p><strong>Комментарий:</strong></p>
        <p>${formData.comment || 'Нет комментария'}</p>
      `,
		};

		console.log('Опции для письма подготовлены:', {
			from: mailOptions.from,
			to: mailOptions.to,
			subject: mailOptions.subject
		});

		try {
			// Отправляем письмо
			const info = await transporter.sendMail(mailOptions);
			console.log('Письмо успешно отправлено:', info.messageId);

			// Возвращаем успешный ответ
			return NextResponse.json({ success: true, messageId: info.messageId });
		} catch (sendError) {
			console.error('Ошибка при отправке письма:', sendError);
			return NextResponse.json(
				{ error: 'Ошибка при отправке письма', details: sendError.message },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Общая ошибка в API-роуте:', error);
		return NextResponse.json(
			{ error: 'Ошибка при обработке запроса', details: error.message },
			{ status: 500 }
		);
	}
}