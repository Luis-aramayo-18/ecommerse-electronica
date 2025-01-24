import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Components/Context/AuthContext";
import RoutesApp from "./Components/RoutesApp";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
