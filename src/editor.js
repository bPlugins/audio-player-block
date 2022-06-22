import { registerBlockType } from '@wordpress/blocks';

import metadata from '../block.json';
import Edit from './Edit';
import './editor.scss';
import icons from './Const/icons';

registerBlockType(metadata, {
	icon: icons.mp3player,

	// Build in Functions
	edit: Edit,

	save: () => null
});