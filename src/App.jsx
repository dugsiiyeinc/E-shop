import { Outlet } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <Header />

      {/* pages */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
