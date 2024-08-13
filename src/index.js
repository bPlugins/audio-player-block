import { registerBlockType } from '@wordpress/blocks';

import './editor.scss';
import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import { mp3playerIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: mp3playerIcon,
	edit: Edit,
	save: () => null
});