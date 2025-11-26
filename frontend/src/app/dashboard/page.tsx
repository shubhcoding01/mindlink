export default function DashboardPage() {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">Welcome to MindLink Dashboard</h1>

      <p className="mt-4 text-gray-700">
        Your AI tools, automations, and workflows will appear here.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div className="card">
          <h3 className="text-lg font-semibold">Create Workflow</h3>
          <p className="text-sm mt-2 text-gray-600">
            Build custom AI workflows visually.
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold">AI Chat</h3>
          <p className="text-sm mt-2 text-gray-600">
            Chat with MindLink AI for instant responses.
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold">Integrations</h3>
          <p className="text-sm mt-2 text-gray-600">
            Connect external apps and APIs.
          </p>
        </div>
      </div>
    </div>
  );
}
