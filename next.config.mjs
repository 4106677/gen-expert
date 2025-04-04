const repoName = 'https://4106677.github.io/gen-expert/';

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
	basePath: repoName,
	assetPrefix: repoName,
	publicRuntimeConfig: {
		basePath: repoName,
	},
	trailingSlash: true,
};


export default nextConfig;
