export default function GoogleTagManager() {
	return (
		<>
			{/*/!* Google tag (gtag.js) *!/*/}
			{/*<script async src="https://www.googletagmanager.com/gtag/js?id=AW-16997971988"></script>*/}
			{/*<script*/}
			{/*	dangerouslySetInnerHTML={{*/}
			{/*		__html: `*/}
			{/*  window.dataLayer = window.dataLayer || [];*/}
			{/*  function gtag(){dataLayer.push(arguments);}*/}
			{/*  gtag('js', new Date());*/}
			{/*  gtag('config', 'AW-16997971988');*/}
			{/*`,*/}
			{/*	}}*/}
			{/*/>*/}
			<script
				dangerouslySetInnerHTML={{
					__html: `<!-- Google Tag Manager -->
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WQQ2LK24');
            <!-- End Google Tag Manager -->`
				}}
			/>
		</>
	);
}