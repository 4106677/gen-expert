// import pkg from "./next-i18next.config.js";
// const { i18n } = pkg;

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"live.staticflickr.com",
			"www.mtu-solutions.com",
			"www.cogeneration.ru",
			"eneraque.com"
		],
	},
	devIndicators: false,
	experimental: {
		disableOptimizedLoading: true,
	},
};


export default nextConfig;
