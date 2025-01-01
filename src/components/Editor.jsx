import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

export default function Editor({ tempNoteText, setTempNoteText }) {
    const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })

    return (
        <section className="bg-white h-screen w-full overflow-hidden">
            <ReactMde
                value={tempNoteText}
                onChange={setTempNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
                classes={{
                    "react-mde": "border-0 h-screen w-full",
                    "mde-header": "bg-gray-50 border-b border-gray-200 px-4 py-2",
                    "mde-tabs": "bg-transparent",
                    "mde-tab": "text-gray-600 hover:text-gray-800 px-4 py-2 mx-1 rounded-t-lg",
                    "selected": "bg-white text-blue-600 border-b-2 border-blue-600",
                    "mde-content": "px-4 h-[calc(100vh-48px)]",
                    "mde-preview": "prose max-w-none px-4 py-2",
                    "mde-textarea-wrapper": "h-full",
                    "mde-text": "px-4 py-2 resize-none h-full w-full",
                }}
            />
        </section>
    )
}