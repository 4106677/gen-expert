const SHEET_RANGE = "!A1:AC";

const API_KEY = "AIzaSyCh28SfuEdWGBg1S2ZdjBiX0j4PzAlcr3c";
const SHEET_ID = "1NzNqQsCbNPYqT6IyxrwDabslauegh_QQg8TSLJY7Ydo";
const RESERVE_API_KEY = "AIzaSyBl591hnUwv_D80UgQetNPiiJC5f5QfERI";
const RESERVE_SHEET_ID = "1ORLwDrBJ2ZkihqqAiByJ3zSfMkLuQW7-YydGuQdHTQo";

const processSheetData = (data) => {
	return (
		data.values
			?.slice(1)
			.filter((item) => item[1]?.trim() !== '') // item[1] — це model
			.map((item) => ({
				manufacturer: item[0],
				model: item[1],
				article: item[2],
				power: item[3],
				powerUnit: item[4],
				voltage: item[5],
				voltageUnit: item[6],
				condition: item[7],
				year: item[8],
				hours: item[9],
				hoursUnit: item[10],
				price: item[11],
				priceUnit: item[12],
				price1kw: item[13],
				location: item[14],
				description: item[15],
				photo1: item[16],
				photo2: item[17],
				photo3: item[18],
				photo4: item[19],
				photo5: item[20],
				photo6: item[21],
				photo7: item[22],
				photo8: item[23],
				photo9: item[24],
				photo10: item[25],
			})) || []
	);
};

export async function fetchGoogleSheetData(sheet) {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet}${SHEET_RANGE}?key=${API_KEY}`;
	const reserveUrl = `https://sheets.googleapis.com/v4/spreadsheets/${RESERVE_SHEET_ID}/values/${sheet}${SHEET_RANGE}?key=${RESERVE_API_KEY}`;

	const fetchData = async (fetchUrl, apiKeyType) => {
		const response = await fetch(fetchUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		console.log(`Data fetched successfully with ${apiKeyType} API key.`);
		return processSheetData(data);
	};

	try {
		return await fetchData(url, "primary");
	} catch (error) {
		try {
			return await fetchData(reserveUrl, "reserve");
		} catch (reserveError) {
			return [];
		}
	}
}