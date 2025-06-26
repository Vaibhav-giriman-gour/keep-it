import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateArea from "./components/CreateArea";
import NoteGrid from "./components/NoteGrid";
import { db } from "./firebaseInit";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "./redux/notesSlice";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const App = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        onSnapshot(collection(db, "KeepIT"), (snapshot) => {
          const notesData = snapshot.docs.map((doc) => {
            const data = doc.data();
            const createdOn = data.CreatedOn?.toDate?.()
              ? dayjs(data.CreatedOn.toDate()).fromNow()
              : "unknown";
            const updatedOn = data.UpdatedOn?.toDate?.()
              ? dayjs(data.UpdatedOn.toDate()).fromNow()
              : "unknown";

            return {
              id: doc.id,
              title: data.Title,
              content: data.Content,
              createdOn,
              updatedOn,
            };
          });
          dispatch(setNotes(notesData));
        });
      } catch (error) {
        console.error("Error while fetching notes: ", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const addNote = async (newNote) => {
    try {
      await addDoc(collection(db, "KeepIT"), {
        Title: newNote.title,
        Content: newNote.content,
        CreatedOn: serverTimestamp(),
        UpdatedOn: serverTimestamp(),
      });

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "KeepIT", id));

    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const updateNote = async (id, updateTitle, updateContent) => {
    try {
      await updateDoc(doc(db, "KeepIT", id), {
        Title: updateTitle,
        Content: updateContent,
        UpdatedOn: serverTimestamp(),
      });

    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow overflow-auto">
        <CreateArea onAdd={addNote} />
        <NoteGrid notes={notes} onDelete={deleteNote} onSave={updateNote} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
