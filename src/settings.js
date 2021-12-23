import {
  AlignmentToolbar,
  BlockControls,
  InspectorControls,
  MediaUpload,
} from "@wordpress/block-editor";
import {
  Button,
  Dashicon,
  PanelBody,
  PanelRow,
  TextControl,
  __experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
// Components
import Title from "../../Components/Title";
import icons from "./Const/icons";
import options from "./Const/options";

const { fontWeights, pxUnit, perUnit, emUnit, remUnit, generalStyleTabs } =
  options;

const Settings = ({ attributes, setAttributes }) => {
  const { audioProperties, alignment, width } = attributes;

  console.log(attributes);

  const addNewAudioProperty = () => {
    setAttributes({
      audioProperties: [
        ...audioProperties,
        {
          title: "Green Chair",
          artist: "Diego Nava",
          cover: { id: null, url: "", alt: "", title: "" },
          audio: { id: null, url: "", title: "" },
        },
      ],
    });
  };

  const updateAudioProperty = (index, type, val, otherType = false) => {
    const newAudioProperties = [...audioProperties];

    if (otherType) {
      newAudioProperties[index][type][otherType] = val;
      setAttributes({ audioProperties: newAudioProperties });
    } else {
      newAudioProperties[index][type] = val;
      setAttributes({ audioProperties: newAudioProperties });
    }
  };

  const onImageSelect = (index, { id, url, alt, title }) =>
    updateAudioProperty(index, "cover", { id, url, alt, title });

  const onAudioSelect = (index, { id, url, title }) =>
    updateAudioProperty(index, "audio", { id, url, title });

  return (
    <>
      <InspectorControls>
        <PanelBody
          className="bPlPanelBody addRemoveItems"
          title={__("Add or Remove Audios", "mp3player-block")}
        >
          {audioProperties.map((item, index) => {
            const { title, artist, cover, audio } = item;

            return (
              <PanelBody
                key={index}
                className="bPlPanelBody editItem"
                title={__(`Audio No ${index + 1}:`, "mp3player-block")}
                initialOpen={0 !== index ? false : true}
              >
                <PanelRow>
                  <Title mt="0" mb="0">
                    {__("Title:", "mp3player-block")}
                  </Title>
                  <TextControl
                    value={title}
                    onChange={(val) => updateAudioProperty(index, "title", val)}
                  />
                </PanelRow>
                <PanelRow>
                  <Title mt="0" mb="0">
                    {__("Artist:", "mp3player-block")}
                  </Title>
                  <TextControl
                    value={artist}
                    onChange={(val) =>
                      updateAudioProperty(index, "artist", val)
                    }
                  />
                </PanelRow>

                <Title>{__("Audio File:", "mp3player-block")}</Title>
                <div className="editImageHolder">
                  <div className="mediaControl">
                    <MediaUpload
                      allowedTypes={["audio"]}
                      value={audio}
                      onSelect={(val) => onAudioSelect(index, val)}
                      render={({ open }) =>
                        !audio?.url ? (
                          <div className="btnControl">
                            <Button icon="upload" onClick={open}>
                              {__("Upload", "bplugins")}
                            </Button>
                          </div>
                        ) : (
                          <div className="btnControl">
                            <Button icon="controls-repeat" onClick={open}>
                              {__("Replace", "bplugins")}
                            </Button>
                            <Button
                              icon="exit"
                              onClick={(e) => {
                                e.preventDefault();
                                setAttributes({
                                  audioProperties: [
                                    ...audioProperties.slice(0, index),
                                    ...audioProperties.slice(index + 1),
                                  ],
                                });
                              }}
                              className="btnRed"
                            >
                              {__("Remove", "bplugins")}
                            </Button>
                          </div>
                        )
                      }
                    />
                  </div>
                </div>

                <Title>{__("Cover Photo:", "mp3player-block")}</Title>
                <div className="editImageHolder">
                  <div className="mediaControl">
                    <MediaUpload
                      allowedTypes={["image"]}
                      value={cover}
                      onSelect={(val) => onImageSelect(index, val)}
                      render={({ open }) =>
                        !cover?.url ? (
                          <div className="btnControl">
                            <Button icon="upload" onClick={open}>
                              {__("Upload", "bplugins")}
                            </Button>
                          </div>
                        ) : (
                          <div className="btnControl">
                            <Button icon="controls-repeat" onClick={open}>
                              {__("Replace", "bplugins")}
                            </Button>
                            <Button
                              icon="exit"
                              onClick={() =>
                                updateAudioProperty(index, "cover", {
                                  id: null,
                                  url: "",
                                  alt: "",
                                  title: "",
                                })
                              }
                              className="btnRed"
                            >
                              {__("Remove", "bplugins")}
                            </Button>
                          </div>
                        )
                      }
                    />
                  </div>
                </div>

                <PanelRow className="itemAction mt20">
                  <Button
                    className="removeItem"
                    label={__("Remove", "mp3player-block")}
                    onClick={(e) => {
                      e.preventDefault();
                      setAttributes({
                        audioProperties: [
                          ...audioProperties.slice(0, index),
                          ...audioProperties.slice(index + 1),
                        ],
                      });
                    }}
                  >
                    <Dashicon icon="no" size={18} />
                    {__("Remove", "mp3player-block")}
                  </Button>

                  <Button
                    className="duplicateItem"
                    label={__("Duplicate", "mp3player-block")}
                    onClick={(e) => {
                      e.preventDefault();
                      setAttributes({
                        audioProperties: [
                          ...audioProperties,
                          { ...audioProperties[index] },
                        ],
                      });
                    }}
                  >
                    {icons.gearSettings}
                    {__("Duplicate", "mp3player-block")}
                  </Button>
                </PanelRow>
              </PanelBody>
            );
          })}

          <div className="addItem">
            <Button
              label={__("Add New Audio", "mp3player-block")}
              onClick={addNewAudioProperty}
            >
              <Dashicon icon="plus" size={23} />
              {__("Add New Audio", "mp3player-block")}
            </Button>
          </div>
        </PanelBody>

        <PanelBody
          className="bPlPanelBody"
          title={__("Player Settings", "mp3player-block")}
        >
          <PanelRow>
            <UnitControl
              className="mt20"
              label={__("Width:", "mp3player-block")}
              labelPosition="left"
              value={width}
              onChange={(val) => setAttributes({ width: val })}
              units={[pxUnit, perUnit]}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <BlockControls>
        <AlignmentToolbar
          value={alignment}
          onChange={(val) => setAttributes({ alignment: val })}
          describedBy={__("Player Alignment")}
          alignmentControls={[
            {
              title: __("Player in left", "mp3player-block"),
              align: "left",
              icon: "align-left",
            },
            {
              title: __("Player in center", "mp3player-block"),
              align: "center",
              icon: "align-center",
            },
            {
              title: __("Player in right", "mp3player-block"),
              align: "right",
              icon: "align-right",
            },
          ]}
        />
      </BlockControls>
    </>
  );
};
export default Settings;
