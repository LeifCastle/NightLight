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
  const notes = useRef({}); //Records all notes

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
    if (dreamHeaders.length === 8) {
      return; //Max dreams is 8
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

  //----Determines if delete button is shown
  let deleteButton;
  if (dreamHeaders.length > 1) {
    deleteButton = (
      <>
        <button
          className="rounded-md bg-qrButton text-qrButtonTextActive"
          onClick={handleDeleteDreamHeader}
        >
          Delete
        </button>
        <div className="text-white ml-3 mr-3 mt-0.5"> | </div>
      </>
    );
  }

  //
  //---------------Returned Component--------------\\
  //

  return (
    <>
      <div className="flex justify-evenly text-rText">
        <div id="dreams" className="flex-col">
          <div className="h-8 flex w-dreamW mt-4 rounded-t-md bg-qrHeader ">
            <div className="basis-5/6 ml-3 text-ott flex grow justify-left">
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
            <div className="flex basis-1/6 justify-center bg-qrButton rounded-t-md rounded-l-md">
              {deleteButton}
              <button
                className="bg-qrButton  text-qrButtonTextActive rounded-md"
                onClick={handleNewDreamHeader}
              >
                New
              </button>
            </div>
          </div>
          <textarea
            className="pl-4 pt-2 pr-4 pb-2 w-dreamW h-dreamH rounded-b-md bg-textInput"
            name="textarea"
            placeholder="My dream..."
            ref={dreamInput}
            onChange={handleNewDream}
          ></textarea>
        </div>
        <div id="notes" className="flex-col items-center mt-4">
          <div className="h-8 w-noteW bg-noteHeader text-noteText rounded-t-md text-center">{`Dream ${selected_display} Notes:`}</div>
          <div className="flex">
            <textarea
              className="pl-4 pt-2 pr-4 pb-2 w-noteW h-noteH rounded-b-md bg-textInput"
              name="textarea"
              placeholder="My note..."
              ref={noteInput}
              onChange={handleNewNote}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="w-screen flex justify-center">
        <button className="w-saveW h-saveH mt-5 rounded-md bg-recordSave text-headerBorder">
          Save Quick Record
        </button>
      </div>
    </>
  );
}
