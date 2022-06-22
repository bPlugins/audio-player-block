import { __ } from '@wordpress/i18n';

const options = {
	pxUnit: { value: 'px', label: 'px', default: 0 },
	perUnit: { value: '%', label: '%', default: 0 },
	emUnit: { value: 'em', label: 'em', default: 0 },
	remUnit: { value: 'rem', label: 'rem', default: 0 },
	vwUnit: { value: 'vw', label: 'vw', default: 0 },
	vhUnit: { value: 'vh', label: 'vh', default: 0 },

	generalStyleTabs: [
		{ name: 'general', title: __('General', 'mp3player-block') },
		{ name: 'style', title: __('Style', 'mp3player-block') },
	]
};
export default options;