import { registerBlockType } from '@wordpress/blocks';

import metadata from '../block.json';
import Edit from './Edit';
import './editor.scss';
import { mp3playerIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: mp3playerIcon,

	// Build in Functions
	edit: Edit,

	save: () => null
});