"use client";
import { createContext, useContext } from "react";

export const ContactsModalContext = createContext(null);
export const useContactsModal = () => useContext(ContactsModalContext);
