// src/App.jsx
import { useEffect } from "react";
import { useAuthStore } from "./utils/auth.store";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRouter />
    </ThemeProvider>
  );
}
export default App;
