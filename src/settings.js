import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl, __experimentalUnitControl as UnitControl, Button, Dashicon } from '@wordpress/components';
import produce from 'immer';

// Components
import { Label, InlineDetailMediaUpload, HelpPanel } from '../../Components';
import { gearIcon } from '../../Components/utils/icons';
import { pxUnit, perUnit } from '../../Components/utils/options';

const Settings = ({ attributes, setAttributes }) => {
	const { audioProperties, alignment, width } = attributes;

	const addNewAudioProperty = () => {
		setAttributes({
			audioProperties: [...audioProperties, {
				title: 'Green Chair',
				artist: 'Diego Nava',
				cover: { id: null, url: '', alt: '', title: '' },
				audio: { id: null, url: '', title: '' }
			}]
		});
	};

	const updateAudioProperty = (index, type, val) => {
		const newAudioProperties = produce(audioProperties, draft => {
			draft[index][type] = val;
		});
		setAttributes({ audioProperties: newAudioProperties });
	};

	const duplicateAudioProperty = (e, index) => {
		e.preventDefault();
		setAttributes({ audioProperties: [...audioProperties.slice(0, index), { ...audioProperties[index] }, ...audioProperties.slice(index)] });
	}

	const removeAudioProperty = (e, index) => {
		e.preventDefault();
		setAttributes({ audioProperties: [...audioProperties.slice(0, index), ...audioProperties.slice(index + 1)] });
	}

	return <>
		<InspectorControls>
			<div className='bpmpInspectorInfo'>
				Need more block like this? Checkout the bundle ➡ <a href='https://wordpress.org/plugins/b-blocks' target='_blank' rel='noopener noreferrer'>B Blocks</a>
			</div>

			<HelpPanel slug='audio-player-block' />


			<PanelBody className='bPlPanelBody addRemoveItems' title={__('Add or Remove Audios', 'mp3player-block')}>
				{audioProperties.map((item, index) => {
					const { title, artist, cover, audio } = item;

					return <PanelBody key={index} className='bPlPanelBody editItem' title={__(`Audio No ${index + 1}:`, 'mp3player-block')} initialOpen={0 !== index ? false : true}>
						<PanelRow>
							<Label className=''>{__('Title:', 'mp3player-block')}</Label>
							<TextControl value={title} onChange={val => updateAudioProperty(index, 'title', val)} />
						</PanelRow>

						<PanelRow>
							<Label className=''>{__('Artist:', 'mp3player-block')}</Label>
							<TextControl value={artist} onChange={val => updateAudioProperty(index, 'artist', val)} />
						</PanelRow>

						<Label>{__('Audio File:', 'mp3player-block')}</Label>
						<InlineDetailMediaUpload value={audio} types={['audio']} onChange={val => updateAudioProperty(index, 'audio', val)} placeholder={__('Enter Audio URL', 'mp3player-block')} />

						<Label>{__('Cover Photo:', 'mp3player-block')}</Label>
						<InlineDetailMediaUpload value={cover} types={['image']} onChange={val => updateAudioProperty(index, 'cover', val)} placeholder={__('Enter Cover Image URL', 'mp3player-block')} />

						<PanelRow className='itemAction mt20'>
							{1 < audioProperties.length && <Button className='removeItem' label={__('Remove', 'mp3player-block')} onClick={e => removeAudioProperty(e, index)}><Dashicon icon='no' />{__('Remove', 'mp3player-block')}</Button>}

							<Button className='duplicateItem' label={__('Duplicate', 'mp3player-block')} onClick={e => duplicateAudioProperty(e, index)}>{gearIcon}{__('Duplicate', 'mp3player-block')}</Button>
						</PanelRow>
					</PanelBody>;
				})}

				<div className='addItem'>
					<Button label={__('Add New Audio', 'mp3player-block')} onClick={addNewAudioProperty}>
						<Dashicon icon='plus' /> {__('Add New Audio', 'mp3player-block')}
					</Button>
				</div>
			</PanelBody>

			<PanelBody className='bPlPanelBody' title={__('Player Settings', 'mp3player-block')}>
				<UnitControl label={__('Width:', 'mp3player-block')} labelPosition='left' value={width} onChange={(val) => setAttributes({ width: val })} units={[pxUnit(), perUnit()]} />
			</PanelBody>
		</InspectorControls>

		<BlockControls>
			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Player Alignment')} alignmentControls={[
				{ title: __('Player in left', 'mp3player-block'), align: 'left', icon: 'align-left' },
				{ title: __('Player in center', 'mp3player-block'), align: 'center', icon: 'align-center' },
				{ title: __('Player in right', 'mp3player-block'), align: 'right', icon: 'align-right' }
			]} />
		</BlockControls>
	</>;
};
export default Settings;