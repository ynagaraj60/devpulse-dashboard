import { useStandupStore } from './useStandupStore'
import NoteCard from './NoteCard'
import AddMemberForm from './AddMemberForm'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function StandupPanel() {
  const notes = useStandupStore((s) => s.notes)

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 flex flex-col max-h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">Team Standup</h2>
        <p className="text-sm text-gray-400 mt-0.5">{formatDate(new Date())}</p>
      </div>

      {/* Add member form */}
      <div className="mb-5">
        <AddMemberForm />
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">
            No team members yet. Add someone above to get started.
          </p>
        ) : (
          notes.map((note) => <NoteCard key={note.id} note={note} />)
        )}
      </div>
    </div>
  )
}
