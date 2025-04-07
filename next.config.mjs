// const repoName = '/gen-expert';

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
	output: 'export',
	// basePath: '',
	// assetPrefix: '',
	// publicRuntimeConfig: {
	// 	basePath: '',
	// },
	trailingSlash: true,
};


export default nextConfig;
