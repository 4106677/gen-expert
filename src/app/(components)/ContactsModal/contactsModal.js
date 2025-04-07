'use client'
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useContactsModal} from "@/context/ContactsModalContext";


export const ContactsModal = () => {
	const { t } = useTranslation('common');
	const [isMounted, setIsMounted] = useState(false);
	const { showContactsModal, setContactsShowModal } = useContactsModal();

	// console.log(showContactsModal)

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div>
			</div>
		);
	}

	return (
		<></>
	)

}