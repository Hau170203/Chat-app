import { AllRoute } from "./components/AllRoute";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { theme } = useThemeStore();
  return (
    <>
      <div data-theme={theme}>
        <Toaster />
        <AllRoute />
      </div>
    </>
  )
}

export default App
