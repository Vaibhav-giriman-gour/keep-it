import React from "react";
import Note from "./Note";

const NoteGrid = ({ notes, onDelete, onSave }) => {
    return (
        <div className="note-grid">
            {[...notes]
                .sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn)) // Sort by latest updatedOn
                .map((note) => (
                    <Note
                        key={note.id} // Make sure id is unique (like Firestore document id)
                        id={note.id}
                        title={note.title}
                        content={note.content}
                        updatedOn={note.updatedOn}
                        onDelete={onDelete}
                        onSave={onSave}
                    />
                ))}
        </div>
    );
};

export default NoteGrid;
