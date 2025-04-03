export function gdLink(driveUrl) {
	const match = driveUrl.match(/\/d\/([^/]+)\//);
	if (match && match[1]) {
		return `https://drive.google.com/uc?export=download&id=${match[1]}`;
	}
	return null;
}