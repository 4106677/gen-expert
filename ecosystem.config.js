module.exports = {
	apps: [
		{
			name: "gen-expert",
			script: "npm",
			args: "run dev",
			cwd: "/Users/asit/pm2/gen-expert", // Повний шлях до проєкту
			env: {
				NODE_ENV: "development",
				PORT: 3867 // Додатково, якщо Next.js не візьме порт із команди
			}
		}
	]
};