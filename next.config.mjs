// next.config.js
const nextConfig = {
	output: 'export', // Вказує, що це статичний сайт
	images: {
		unoptimized: true, // Вимикає оптимізацію зображень для статичного хостингу
	},
	basePath: 'https://4106677.github.io/gen-expert/', // Назва вашого репозиторію
	assetPrefix: 'https://4106677.github.io/gen-expert/', // Для коректних шляхів до активів
};

export default nextConfig;