import { registerBlockType } from "@wordpress/blocks";
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import MP3Player from '../assets/js/script';
// Metadata
import metadata from "../block.json";
// Icons
import icons from "./Const/icons";
// Import Files
import "./editor.scss";
import Settings from './settings';

const icon = icons.timeline;

const {
  name,
  title,
  description,
  category,
  keywords,
  supports,
  attributes,
  example,
} = metadata;

registerBlockType(name, {
  title,
  description,
  icon,
  category,
  keywords,
  supports,
  attributes,
  example,
  // Build in Functions
  edit: (props) => {
    const { className, attributes, setAttributes, clientId } = props;
	const { audioProperties } = attributes;



    useEffect(() => {
      clientId && setAttributes({ cId: clientId });
    }, [clientId]); // Set & Update clientId to cId

    useEffect(() => {
		0 !== audioProperties?.length && MP3Player('#block-' + clientId, audioProperties);
    }, [audioProperties]);

    // Change array attribute data

    return <>
      	<Settings attributes={attributes} setAttributes={setAttributes} />

		{0 !== audioProperties?.length ? <div className={className} id={`bpmp3player-${clientId}`}>
			<div className="music-container">
				<div id="cover-box">
					<img src="http://localhost/bplugins/wp-content/uploads/2021/06/a9d4ff49-c1c9-3c7a-b468-962ec3c3054f.jpg" alt="cover-image" id="cover" />
				</div>
				<div id="music-box">
					<audio id="disc"></audio>
					<div id="music-info">
						<h2 id="title"></h2>
						<h3 id="artist"></h3>
						<div id="progress-container">
							<div id="progress"></div>
						</div>
						<div id="timer-bar">
							<span id="timer">0:00</span>
							<span id="duration"></span>
						</div>
					</div>
					<div id="control-box">
						<i id="prev" className="btn fas fa-backward"></i>
						<i id="play" className="special-btn fas fa-play"></i>
						<i id="next" className="btn fas fa-forward"></i>
					</div>
				</div>
			</div>
      </div> : <p>{__('Please add audio file first!')}</p>}
    </>;
  },

  save: () => null,
});
