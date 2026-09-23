import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
