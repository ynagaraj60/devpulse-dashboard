import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface StandupNote {
  id: string
  memberName: string
  date: string
  content: string
}

interface StandupStore {
  notes: StandupNote[]
  addNote: (memberName: string) => void
  updateNote: (id: string, content: string) => void
  deleteNote: (id: string) => void
}

const todayISO = () => new Date().toISOString().split('T')[0]

export const useStandupStore = create<StandupStore>()(
  persist(
    (set) => ({
      notes: [
        {
          id: crypto.randomUUID(),
          memberName: 'Alice',
          date: todayISO(),
          content: 'Finished the auth flow and started on the dashboard layout.',
        },
        {
          id: crypto.randomUUID(),
          memberName: 'Bob',
          date: todayISO(),
          content: 'Reviewed PRs and fixed the CI pipeline timeout issue.',
        },
      ],
      addNote: (memberName: string) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: crypto.randomUUID(),
              memberName,
              date: todayISO(),
              content: '',
            },
          ],
        })),
      updateNote: (id: string, content: string) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, content } : note
          ),
        })),
      deleteNote: (id: string) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
    }),
    { name: 'devpulse-standup' }
  )
)
