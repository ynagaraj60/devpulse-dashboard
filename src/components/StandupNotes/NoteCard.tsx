import { useState } from 'react'
import type { StandupNote } from './useStandupStore'
import { useStandupStore } from './useStandupStore'

interface NoteCardProps {
  note: StandupNote
}

const avatarColors = [
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-violet-500',
  'bg-pink-500',
  'bg-teal-500',
]

function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

export default function NoteCard({ note }: NoteCardProps) {
  const { updateNote, deleteNote } = useStandupStore()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(note.content)

  const handleSave = () => {
    updateNote(note.id, draft)
    setEditing(false)
  }

  const handleCancel = () => {
    setDraft(note.content)
    setEditing(false)
  }

  return (
    <div className="relative bg-gray-800/50 rounded-lg border border-gray-700 p-4 group">
      {/* Delete button */}
      <button
        onClick={() => deleteNote(note.id)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        aria-label={`Delete ${note.memberName}'s note`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Header: avatar + name + date */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white ${getAvatarColor(note.memberName)}`}
        >
          {note.memberName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{note.memberName}</p>
          <p className="text-xs text-gray-400">{note.date}</p>
        </div>
      </div>

      {/* Content */}
      {editing ? (
        <div className="space-y-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What did you work on?"
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 text-xs font-medium rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-xs font-medium rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-300 min-h-[1.5rem]">
            {note.content || (
              <span className="text-gray-500 italic">No update yet</span>
            )}
          </p>
          <button
            onClick={() => setEditing(true)}
            className="mt-2 px-3 py-1 text-xs font-medium rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  )
}
