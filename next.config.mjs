// const repoName = '/gen-expert';

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
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
	// output: 'export',
	trailingSlash: true,
};


export default nextConfig;
