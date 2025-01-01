import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore"
import { notesCollection, db } from "./firebase"

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const [tempNoteText, setTempNoteText] = React.useState("")
    const [error, setError] = React.useState(null)
    const [isOnline, setIsOnline] = React.useState(navigator.onLine)
    
    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]
    const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

    React.useEffect(() => {
        function handleOnline() {
            setIsOnline(true)
            setError(null)
        }
        
        function handleOffline() {
            setIsOnline(false)
            setError("You are offline. Changes will sync when you're back online.")
        }

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, 
            function(snapshot) {
                const notesArr = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setNotes(notesArr)
                setError(null)
            },
            (err) => {
                console.error("Firebase error:", err)
                setError("Failed to load notes. Please check your connection.")
            }
        )
        return unsubscribe
    }, [])
    
    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    React.useEffect(() => {
        if (currentNote) {
            setTempNoteText(currentNote.body)
        }
    }, [currentNote])

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote?.body) {
                updateNote(tempNoteText)
            }
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [tempNoteText])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(
            docRef, 
            { body: text, updatedAt: Date.now() }, 
            { merge: true }
        )
    }

    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
    }

    return (
        <main className="bg-gray-50 h-screen">
            {error && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 fixed top-0 right-0 left-0 z-50">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                {error}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {notes.length > 0 ? (
                <Split 
                    sizes={[30, 70]} 
                    direction="horizontal" 
                    className="split h-screen flex"
                    gutterSize={4}
                    minSize={[150, 400]}
                >
                    <Sidebar
                        notes={sortedNotes}
                        currentNote={currentNote}
                        setCurrentNoteId={setCurrentNoteId}
                        newNote={createNewNote}
                        deleteNote={deleteNote}
                    />
                    <Editor
                        tempNoteText={tempNoteText}
                        setTempNoteText={setTempNoteText}
                    />
                </Split>
            ) : (
                <div className="h-screen flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">
                        No notes yet
                    </h1>
                    <button
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg
                                 hover:bg-blue-700 transition-colors duration-200
                                 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                                 active:translate-y-0 active:shadow-lg"
                        onClick={createNewNote}
                    >
                        Create your first note
                    </button>
                </div>
            )}
        </main>
    )
}