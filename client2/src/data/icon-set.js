import {
  TypeScriptIcon,
  PHPIcon,
  JavaIcon,
  JavaScriptIcon,
  CSS3Icon,
  PythonIcon,
  HTML5Icon,
} from "developer-icons";

const iconStyle = {
  width: "24px",
  height: "24px",
  fill: "currentColor",
  margin: "0 5px",
};

export const languagesIcons = {
  javascript: <JavaScriptIcon style={iconStyle} />,
  java: <JavaIcon style={iconStyle} />,
  typescript: <TypeScriptIcon style={iconStyle} />,
  php: <PHPIcon style={iconStyle} />,
  css: <CSS3Icon style={iconStyle} />,
  python: <PythonIcon style={iconStyle} />,
  html: <HTML5Icon style={iconStyle} />,
};
