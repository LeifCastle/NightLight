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
  const noteInput = useRef(null); //Text area where notes are written
  const dreams = useRef({}); //Records all dreams
  const notes = useRef({});

  //----States
  const [assignedRealIndex, setAssignedRealIndex] = useState(1); //Assigns sequential real_index with no regard to deleted indices
  const [view_index, setview_index] = useState(1); //Current real_index of the dream user is viewing
  const [selected_display, setSelected_display] = useState(1); //Displayed index of the dream user is viewing
  //Array of dream header elements (corresponds to dream entries)
  const [dreamHeaders, setDreamHeaders] = useState([
    <DreamHeader key={1} real_index={1} changeDream={changeDream} />,
  ]);

  //
  //---------------Functions--------------\\
  //

  //----When user creates a new dream:
  function handleNewDreamHeader() {
    if (dreamHeaders.length === 9) {
      return; //Max dreams is 9
    }
    setDreamHeaders([
      ...dreamHeaders,
      <DreamHeader
        key={assignedRealIndex + 1}
        real_index={assignedRealIndex + 1}
        changeDream={changeDream}
      />,
    ]);
    dreams[`Dream${view_index}`] = dreamInput.current.value; //Updates dream entry to be text area input value
    notes[`Dream${view_index}`] = noteInput.current.value; //Updates note entry to be text area input value
    dreamInput.current.value = ""; //Resets the text area
    noteInput.current.value = ""; //Resets the text area
    setview_index(assignedRealIndex + 1);
    setAssignedRealIndex(assignedRealIndex + 1);
    setSelected_display(dreamHeaders.length + 1);
  }

  //----When users deletes a dream:
  function handleDeleteDreamHeader() {
    if (dreamHeaders.length === 1) {
      return; //Prevents user from deleting all dreams
    }
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
    //Sets text input areas to stored/empty value
    dreamInput.current.value =
      dreams[`Dream${lastDream.props.real_index}`] ?? "";
    noteInput.current.value = notes[`Dream${lastDream.props.real_index}`] ?? "";
    setview_index(lastDream.props.real_index);
    setSelected_display(dreamHeaders.length - 1);
    console.log(dreamHeaders);
  }

  //----When user switches between dream tabs:
  function changeDream(event) {
    //Sets text input areas to stored/empty value
    dreamInput.current.value =
      dreams[`Dream${event.target.getAttribute("real_index")}`] ?? "";
    noteInput.current.value =
      notes[`Dream${event.target.getAttribute("real_index")}`] ?? "";
    setview_index(parseInt(event.target.getAttribute("real_index")));
    setSelected_display(event.target.getAttribute("display_index"));
    console.log(event.target);
  }

  //----On user change dream text:
  function handleNewDream(event) {
    dreams[`Dream${view_index}`] = event.target.value;
  }

  //----On user change note text:
  function handleNewNote(event) {
    notes[`Dream${view_index}`] = event.target.value;
  }

  //
  //---------------Returned Component--------------\\
  //

  return (
    <>
      <div className="flex justify-evenly text-black">
        <div id="dreams" className="flex-col">
          <div className="h-8 flex w-dreamW mt-4 rounded-t-md bg-pageHeader ">
            <div className="basis-1/3 ml-3 flex grow justify-left">
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
            <div className="flex basis-1/3 justify-center mr-4">
              <button
                className="mr-2 rounded-md p-1 text-black bg-qrButtonActive"
                onClick={handleDeleteDreamHeader}
              >
                Delete
              </button>
              <button
                className="bg-qrButtonActive text-black p-1 rounded-md"
                onClick={handleNewDreamHeader}
              >
                New
              </button>
            </div>
          </div>
          <textarea
            className="text-black w-dreamW h-dreamH rounded-b-md bg-textInput"
            name="textarea"
            placeholder="My dream..."
            ref={dreamInput}
            onChange={handleNewDream}
          ></textarea>
        </div>
        <div id="notes" className="flex-col items-center mt-4">
          <div className="h-8 w-noteW bg-pageHeader rounded-t-md text-center">{`Dream ${selected_display} Notes:`}</div>
          <div className="flex">
            <textarea
              className="text-black w-noteW h-noteH rounded-b-md bg-textInput"
              name="textarea"
              placeholder="My note..."
              ref={noteInput}
              onChange={handleNewNote}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="w-screen flex justify-center">
        <button className="w-saveW h-saveH mt-5 rounded-md text-black bg-slate-600">
          Save Quick Record
        </button>
      </div>
    </>
  );
}
