import React, { useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Modal from "react-modal";
import "./Note.css";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { removeNotes, updateNotes } from "../redux/notesSlice";
import { db } from "../firebaseInit";
import { deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

Modal.setAppElement("#root");

const Note = (props) => {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(props.content);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const textAreaRef = useRef(null);

  const handleClick = async () => {
    await deleteDoc(doc(db, "KeepIT", props.id));
    dispatch(removeNotes(props.id));
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSaveChanges = async () => {
    const noteRef = doc(db, "KeepIT", props.id);
    await updateDoc(noteRef, {
      Title: editedTitle,
      Content: editedContent,
      UpdatedOn: serverTimestamp(),
    });

    dispatch(updateNotes({
      id: props.id,
      title: editedTitle,
      content: editedContent,
      updatedOn: new Date(), // ✅ update local time immediately
    }));

    setModalIsOpen(false);
  };

  const formatUpdatedOn = () => {
    if (!props.updatedOn) return "N/A";

    const dateObj = props.updatedOn.toDate
      ? props.updatedOn.toDate()
      : new Date(props.updatedOn);

    return dayjs(dateObj).fromNow();
  };

  return (
    <>
      <div
        className="note-card bg-tempBox-500 rounded-lg overflow-hidden shadow-lg m-3 p-2 max-h-[250px] grid grid-rows-[1fr, auto] justify-between"
        onClick={handleOpenModal}
      >
        <div className="overflow-hidden">
          <h1 className="m-2 md:text-2xl text-xl font-semibold break-words">
            {editedTitle}
          </h1>

          <p className="md:text-xl font-thin text-gray-500 whitespace-pre-wrap overflow-hidden overflow-ellipsis">
            {editedContent}
          </p>
        </div>
        <div className="flex justify-start items-end space-x-2">
          <IconButton
            className="deleteButton text-nav-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            className="editButton text-nav-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal();
            }}
          >
            <EditIcon />
          </IconButton>
          <span className="text-xs text-gray-500">
            Last updated: {formatUpdatedOn()}
          </span>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Edit Notes"
        className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-20 z-100"
        overlayClassName="overlay"
      >
        <div className="rounded-lg shadow-lg p-4 max-w-lg mx-auto my-20 bg-tempBox-500">
          <h2 className="text-xl font-bold mb-4">{props.title}</h2>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="border p-2 w-full mb-4"
            ref={textAreaRef}
            rows={10}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="editButton bg-nav-500 text-white px-4 py-2 rounded"
              onClick={handleSaveChanges}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Note;
