export default function DreamHeader({ index, changeDream }) {
  return (
    <button id={index} className={`mr-2 bg-slate-500`} onClick={changeDream}>
      Dream {index}
    </button>
  );
}
