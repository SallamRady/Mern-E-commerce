import { Outlet } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/layout/MainHeader";

function App() {
  return (
    <div>
      <MainHeader />
      <main className="bg-slate-100 min-h-[calc(100vh)]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
