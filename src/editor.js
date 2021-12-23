import { registerBlockType } from "@wordpress/blocks";
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import MP3Player from "../assets/js/script";
// Metadata
import metadata from "../block.json";
// Icons
import icons from "./Const/icons";
// Import Files
import "./editor.scss";
import Settings from "./settings";

const icon = icons.mp3player;

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
    const { audioProperties, width, alignment } = attributes;

    useEffect(() => {
      clientId && setAttributes({ cId: clientId });
    }, [clientId]); // Set & Update clientId to cId

    useEffect(() => {
      0 !== audioProperties?.length &&
        MP3Player("#block-" + clientId, audioProperties);
    }, [audioProperties]);

    // Change array attribute data

    return (
      <>
        <Settings attributes={attributes} setAttributes={setAttributes} />

        {0 !== audioProperties?.length ? (
          <div className={className} id={`bpmp3player-${clientId}`}>
            <div className="music-container">
              <div id="cover-box">
                <img src="" alt="cover-image" id="cover" />
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
                  <span className="btnPrev">
                    <svg
                      id="prev"
                      className="btn"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z" />
                    </svg>
                  </span>
                  <span className="special-btn">
                    <svg
                      className="playBtn"
                      id="play"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        className="playPath"
                        d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                      />
                      <path
                        className="pausePath"
                        d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
                      />
                    </svg>
                  </span>
                  <span className="btnNext">
                    <svg
                      id="next"
                      className="btn "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z" />
                    </svg>
                  </span>
                  {/* <i id="prev" className="btn fas fa-backward"></i>
                  <i id="play" className="special-btn fas fa-play"></i>
                  <i id="next" className="btn fas fa-forward"></i> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>{__("Please add audio file first!")}</p>
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
                #bpmp3player-${clientId}{
                  text-align: ${alignment};
                }
                #bpmp3player-${clientId} .music-container{
                  width: ${width};
                }`,
          }}
        />
      </>
    );
  },

  save: () => null,
});
