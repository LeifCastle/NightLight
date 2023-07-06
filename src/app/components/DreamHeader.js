import { useContext } from "react";
import { HeaderBgContext } from "../contexts";

export default function DreamHeader({
  display_index,
  real_index,
  changeDream,
}) {
  const currentDreamIndex = useContext(HeaderBgContext);
  let background;
  let text;
  let br;
  if (currentDreamIndex === parseInt(real_index)) {
    background = "bg-qrButtonActive";
    text = "text-selectT";
    br = "";
  } else {
    background = "bg-qrButton";
    text = "tect-ott";
    br = "rounded-b-md";
  }
  return (
    <button
      real_index={real_index}
      className={`mr-2 ${background} ${text} ${br} rounded-t-md p-1 h-8`}
      onClick={changeDream}
      display_index={display_index}
    >
      Dream {display_index}
    </button>
  );
}
