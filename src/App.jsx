import { Outlet } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="bg-gray-50 h-screen">
      {/* Header */}
      <Header />

      {/* pages */}
      <main className="min-h-2/3">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
