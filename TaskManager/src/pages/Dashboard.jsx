import Sidebar from "../Components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <p className="text-gray-600">
          Welcome to your task dashboard.
        </p>
      </div>
    </div>
  );
}
