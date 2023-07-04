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
    background = "bg-lime-600";
  } else {
    background = "bg-slate-500";
  }
  console.log("-----------------------------Rebuild-------------------------");
  return (
    <button
      real_index={real_index}
      className={`mr-2 ${background}`}
      onClick={changeDream}
    >
      Dream {display_index}
    </button>
  );
}
