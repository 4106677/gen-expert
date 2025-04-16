export default function GoogleTagManagerNoScript() {
	return (
		<noscript
			dangerouslySetInnerHTML={{
				__html: `<!-- Google Tag Manager (noscript) -->
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WQQ2LK24" height="0" width="0" style="display:none;visibility:hidden"></iframe>
            <!-- End Google Tag Manager (noscript) -->`
			}}
		/>
	);
}