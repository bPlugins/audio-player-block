import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';

import MP3Player from './MP3Player';
import Settings from './Settings';
import Style from './Style';
import { nextIcon, playIcon, prevIcon } from './utils/icons';

const Edit = props => {
	const { className, attributes, setAttributes, clientId } = props;
	const { audioProperties } = attributes;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => {
		0 !== audioProperties?.length && MP3Player(`#bpMp3Player-${clientId}`, audioProperties);
	}, [audioProperties]);

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} />

		{0 !== audioProperties?.length ? <div className={className} id={`bpMp3Player-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

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