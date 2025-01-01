import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map(note => (
        <div key={note.id} className="mb-2">
            <div
                className={`group flex justify-between items-center p-4 rounded-lg
                           cursor-pointer transition-all duration-200
                           ${note.id === props.currentNote?.id 
                             ? "bg-blue-50 shadow-sm" 
                             : "hover:bg-gray-50"}`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className={`font-medium truncate flex-grow
                               ${note.id === props.currentNote?.id 
                                 ? "text-blue-600" 
                                 : "text-gray-700"}`}>
                    {note.body.split("\n")[0] || "Untitled Note"}
                </h4>
                <button 
                    className="text-gray-400 hover:text-red-500 transition-colors
                             duration-200 opacity-0 group-hover:opacity-100
                             focus:opacity-100 p-1 rounded-full hover:bg-red-50"
                    onClick={(e) => {
                        e.stopPropagation()
                        props.deleteNote(note.id)
                    }}
                    aria-label="Delete note"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="bg-white border-r border-gray-200 flex flex-col h-screen">
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Notes</h3>
                    <button 
                        className="bg-blue-600 text-white w-8 h-8 rounded-full
                                 flex items-center justify-center text-xl font-bold
                                 hover:bg-blue-700 transition-colors duration-200
                                 shadow-sm hover:shadow-md transform hover:-translate-y-0.5
                                 active:translate-y-0"
                        onClick={props.newNote}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="overflow-y-auto flex-grow p-4">
                {noteElements}
            </div>
        </section>
    )
}