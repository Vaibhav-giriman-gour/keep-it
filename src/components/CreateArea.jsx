import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { Zoom } from "@mui/material";
import { db } from "../firebaseInit";
import { collection, addDoc,} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addNotes } from "../redux/notesSlice";

const CreateArea = (props) => {
  const dispatch = useDispatch()
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const textAreaRef = useRef(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((preNote) => {
      return {
        ...preNote,
        [name]: value,
      };
    });
  };

  const submitNote = async (event) => {
    event.preventDefault();
    // Add a new document with a generated id.
    const timestamp = new Date()

    const docRef = await addDoc(collection(db, "KeepIT"), {
      Title: note.title,
      Content: note.content,
      CreatedOn: timestamp,
      UpdatedOn: timestamp
    });

    dispatch(addNotes({
      id: docRef.id,
      title: note.title,
      content: note.content,
      createdOn: timestamp,
      updatedOn: timestamp,
    }));

    setNote({
      title: "",
      content: "",
    });
  };
  const adjustTextAreaStyle = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [note.content]);

  return (
    <div className="flex justify-center items-center">
      <form
        action=""
        className={`bg-tempBox-500 rounded-lg w-[60%] sm:w-[40%] shadow-lg relative m-4 p-2 z-50 `}
      >
        <div className="w-full p-2 text-lg flex flex-col">
          {isExpanded && (
            <input
              onChange={handleChange}
              name="title"
              value={note.title}
              placeholder="Title"
              className="mb-2 focus:outline-none border-none"
            />
          )}

          <textarea
            onChange={handleChange}
            ref={textAreaRef}
            onInput={adjustTextAreaStyle}
            name="content"
            id=""
            value={note.content}
            placeholder="Take a note..."
            onClick={() => setIsExpanded(true)}
            className=" whitespace-pre-wrap text-lg border-none focus:outline-none resize-none"
            rows={isExpanded ? 4 : 1}
          ></textarea>
        </div>
        <Zoom in={isExpanded}>
          <Fab
            onClick={submitNote}
            className="addButton bg-nav-500 border-none text-lg float-right -bottom-8 rounded-xl m-2 p-2 cursor-pointer "
          >
            <AddIcon></AddIcon>
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

export default CreateArea;
