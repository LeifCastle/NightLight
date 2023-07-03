"use client";
import DreamHeader from "../components/DreamHeader";
import { useState, useRef } from "react";

export default function Quick_Record() {
  //---------Variables--------\\

  //----Refs
  const dreamInput = useRef(null); //Text area where dreams are written
  const dreams = useRef({}); //Records all dreams

  //----States
  const [assignDreamIndex, setAssignDreamIndex] = useState(1); //Assigns dream entries sequential indices (keys)
  const [currentDreamIndex, setCurrentDreamIndex] = useState(0); //Current index of dream user has selected
  //Array of dream header elements (corresponds to dream entries)
  const [dreamHeaders, setDreamHeaders] = useState([
    <DreamHeader key={1} index={1} changeDream={changeDream} />,
  ]);

  //---------Functions--------\\

  //----Creates a new dream header
  function handleNewDreamHeader() {
    setDreamHeaders([
      ...dreamHeaders,
      <DreamHeader
        key={assignDreamIndex + 1}
        index={assignDreamIndex + 1}
        changeDream={changeDream}
      />,
    ]);
    dreams[`Dream${assignDreamIndex}`] = dreamInput.current.value; //Updates dream entry to be text area input value
    dreamInput.current.value = ""; //Resets the text area
    setAssignDreamIndex(assignDreamIndex + 1);
    setCurrentDreamIndex(assignDreamIndex + 1);
  }

  //----Updates dream entry values on text area input change
  function handleNewText(event) {
    dreams[`Dream${currentDreamIndex}`] = event.target.value;
  }

  //----Handles changing user view (selected header and dream text) to selected dream
  function changeDream(event) {
    //Change Header Backgrounds
    event.target.parentElement
      .querySelectorAll(".bg-lime-600")
      .forEach((sibling) => {
        sibling.classList.remove("bg-lime-600");
        sibling.classList.add("bg-slate-500");
      });
    event.target.classList.remove("bg-slate-500");
    event.target.classList.add("bg-lime-600");
    //Set dream text area to correct value
    if (dreams[`Dream${event.target.id}`] !== undefined) {
      dreamInput.current.value = dreams[`Dream${event.target.id}`];
    } else {
      dreamInput.current.value = "";
    }
    setCurrentDreamIndex(event.target.id);
  }

  //---------Returned Component--------\\
  return (
    <>
      <div className="h-12 bg-stone-500 flex items-center justify-center">
        <div className="basis-1/3"></div>
        <div className="basis-1/3 text-center">{dreamHeaders}</div>
        <div className="flex basis-1/3 justify-end mr-4">
          <button className="mr-2">Delete</button>
          <button onClick={handleNewDreamHeader}>New</button>
        </div>
      </div>
      <div className="text-black">
        <textarea
          name="textarea"
          rows="10"
          cols="50"
          placeholder="My dream..."
          ref={dreamInput}
          onChange={handleNewText}
        ></textarea>
      </div>
    </>
  );
}
