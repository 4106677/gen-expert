export function bbExtractor(bbcode) {
	const match = bbcode?.match(/\[img\](.*?)\[\/img\]/i);
	return match ? match[1] : bbcode;
}