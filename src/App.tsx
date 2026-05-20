import { HealthPanel } from './components/HealthMonitor'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <h1 className="text-3xl font-bold text-white">DevPulse Dashboard</h1>
      <p className="text-gray-400 mt-2">Panels loading soon...</p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <HealthPanel />
      </div>
    </div>
  )
}

export default App
