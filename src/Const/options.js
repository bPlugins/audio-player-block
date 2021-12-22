import { __ } from "@wordpress/i18n";

const options = {
  types: [
    {
      label: __("Vertical", "timeline-block"),
      value: "vertical",
    },
    {
      label: __("Horizontal", "timeline-block"),
      value: "horizontal",
    },
  ],
  topBottom: [
    {
      label: __("Top", "timeline-block"),
      value: "top",
    },
    {
      label: __("Bottom", "timeline-block"),
      value: "bottom",
    },
  ],
  leftRight: [
    {
      label: __("Left", "timeline-block"),
      value: "left",
    },
    {
      label: __("Right", "timeline-block"),
      value: "right",
    },
  ],
  fontStyles: [
    {
      label: __("Normal", "timeline-block"),
      value: "normal",
    },
    {
      label: __("Italic", "timeline-block"),
      value: "italic",
    },
  ],
  fontWeights: [
    {
      label: __("Normal", "timeline-block"),
      value: "normal",
    },
    {
      label: __("Bold", "timeline-block"),
      value: "bold",
    },
  ],

  pxUnit: { value: "px", label: "px", default: 0 },
  perUnit: { value: "%", label: "%", default: 0 },
  emUnit: { value: "em", label: "em", default: 0 },
  remUnit: { value: "rem", label: "rem", default: 0 },
  vwUnit: { value: "vw", label: "vw", default: 0 },
  vhUnit: { value: "vh", label: "vh", default: 0 },

  generalStyleTabs: [
    { name: "general", title: __("General", "b-blocks") },
    { name: "style", title: __("Style", "b-blocks") },
  ],
};
export default options;
