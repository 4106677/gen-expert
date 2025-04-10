// src/app/equipment/hooks/useResponsive.js
import { useState, useEffect } from "react";

export function useResponsive() {
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 0
	);
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	// Set up listener for window resize
	useEffect(() => {
		setIsMounted(true);

		if (typeof window !== 'undefined') {
			const handleResize = () => {
				setWindowWidth(window.innerWidth);
				// Hide filter in mobile view if window width exceeds breakpoint
				if (window.innerWidth >= 1250) {
					setIsFilterVisible(false);
				}
			};

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);

	// Toggle filter visibility in mobile view
	const toggleFilter = () => {
		setIsFilterVisible(!isFilterVisible);
	};

	return {
		windowWidth,
		isFilterVisible,
		toggleFilter,
		isMounted
	};
}