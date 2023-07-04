"use client";
import DreamHeader from "../components/DreamHeader";
import { useState, useRef } from "react";
import { HeaderBgContext } from "../contexts";

export default function Quick_Record() {
  //
  //---------------Variables--------------\\
  //

  //----Refs
  const dreamInput = useRef(null); //Text area where dreams are written
  const dreams = useRef({}); //Records all dreams

  //----States
  const [assignedRealIndex, setAssignedRealIndex] = useState(1); //Assigns sequential real_index with no regard to deleted indices
  const [view_index, setview_index] = useState(1); //Current real_index of the dream user is viewing
  //Array of dream header elements (corresponds to dream entries)
  const [dreamHeaders, setDreamHeaders] = useState([
    <DreamHeader key={1} real_index={1} changeDream={changeDream} />,
  ]);

  //
  //---------------Functions--------------\\
  //

  //----When user creates a new dream:
  function handleNewDreamHeader() {
    setDreamHeaders([
      ...dreamHeaders,
      <DreamHeader
        key={assignedRealIndex + 1}
        real_index={assignedRealIndex + 1}
        changeDream={changeDream}
      />,
    ]);
    dreams[`Dream${view_index}`] = dreamInput.current.value; //Updates dream entry to be text area input value
    dreamInput.current.value = ""; //Resets the text area
    setview_index(assignedRealIndex + 1);
    setAssignedRealIndex(assignedRealIndex + 1);
  }

  //----When users deletes a dream:
  function handleDeleteDreamHeader() {
    //Deletes current dream and compoennt
    let newDreamHeaders = [];
    dreamHeaders.forEach((component) => {
      if (component.key != view_index) {
        newDreamHeaders.push(component);
      }
    });
    delete dreams[`Dream${view_index}`];
    setDreamHeaders(newDreamHeaders);
    //Gets last dream component in dreamHeaders to access it's real_index
    let lastDream = newDreamHeaders[newDreamHeaders.length - 1];
    //Sets text input area to stored/empty value
    dreamInput.current.value =
      dreams[`Dream${lastDream.props.real_index}`] ?? "";
    setview_index(lastDream.props.real_index);
  }

  //----When user switches between dream tabs:
  function changeDream(event) {
    //Sets text input area to stored/empty value
    dreamInput.current.value =
      dreams[`Dream${event.target.getAttribute("real_index")}`] ?? "";
    setview_index(parseInt(event.target.getAttribute("real_index")));
  }

  //----On user change dream text:
  function handleNewText(event) {
    dreams[`Dream${view_index}`] = event.target.value;
  }

  //
  //---------------Returned Component--------------\\
  //

  return (
    <>
      <div className="h-12 bg-stone-500 flex items-center justify-center">
        <div className="basis-1/3"></div>
        <div className="basis-1/3 text-center">
          <HeaderBgContext.Provider value={view_index}>
            {dreamHeaders.map((dreamHeader, index) => (
              <DreamHeader
                key={dreamHeader.key}
                real_index={dreamHeader.key}
                display_index={index + 1}
                changeDream={changeDream}
              />
            ))}
          </HeaderBgContext.Provider>
        </div>
        <div className="flex basis-1/3 justify-end mr-4">
          <button className="mr-2" onClick={handleDeleteDreamHeader}>
            Delete
          </button>
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
