import { useContext } from "react";
import { HeaderBgContext } from "../contexts";

export default function DreamHeader({
  display_index,
  real_index,
  changeDream,
}) {
  const currentDreamIndex = useContext(HeaderBgContext);
  let background;
  if (currentDreamIndex === parseInt(real_index)) {
    background = "bg-qrButtonActive";
  } else {
    background = "bg-qrButton";
  }
  return (
    <button
      real_index={real_index}
      className={`mr-2 ${background} rounded-md p-1 h-8`}
      onClick={changeDream}
      display_index={display_index}
    >
      Dream {display_index}
    </button>
  );
}
