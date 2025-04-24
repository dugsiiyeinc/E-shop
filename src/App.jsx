import { Outlet, useLocation,  } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from "./Context/AuthContext";

function App() {
  const location=useLocation()
  // console.log(location.pathname)
  return (
  
    <div className="bg-gray-50 h-screen">
        <AuthProvider>
      {/* Header */}
      {!location.pathname.includes('admin') && <Header />}

      {/* pages */}
      <main className="min-h-2/3">
         <Outlet />
      </main>

      {/* Footer */}
      {!location.pathname.includes('admin') && <Footer />}
      <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </div>

  );
}

export default App;
