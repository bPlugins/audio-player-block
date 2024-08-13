import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import Settings from './Settings/Settings';
import Style from '../Common/Style';
import MP3Player from '../Common/MP3Player';
import { nextIcon, playIcon, prevIcon } from '../../utils/icons';

const Edit = props => {
	const { attributes, setAttributes, clientId } = props;
	const { audioProperties } = attributes;

	const id = `bpMp3Player-${clientId}`;

	useEffect(() => {
		0 !== audioProperties?.length && MP3Player(`#${id}`, audioProperties);
	}, [audioProperties]);

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} />

		{0 !== audioProperties?.length ? <div {...useBlockProps()} id={id}>
			<Style attributes={attributes} id={id} />

			<div className='bpMp3Player'>
				<div className='coverBox'>
					<img id='cover' />
				</div>

				<div className='contentBox'>
					<audio id='disc'></audio>

					<div className='info'>
						<h2 id='title'></h2>
						<h3 id='artist'></h3>

						<div id='progressContainer'>
							<div id='progress'></div>
						</div>

						<div className='timeBar'>
							<span id='timer'>0:00</span>
							<span id='duration'></span>
						</div>
					</div>

					<div className='controls'>
						<span className='prevBtn'>
							{prevIcon}
						</span>

						<span className='playPauseBtn'>
							{playIcon}
						</span>

						<span className='nextBtn'>
							{nextIcon}
						</span>
					</div>
				</div>
			</div>
		</div> : <h3 className='bpMp3PlayerError'>{__('Please add audio file first!', 'mp3player-block')}</h3>}
	</>;
};
export default Edit;