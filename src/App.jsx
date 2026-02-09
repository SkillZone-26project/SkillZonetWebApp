import { Routes, Route } from "react-router-dom";
// import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import Home from "./Components/Home/Home.jsx"

function App() {
 

  return (
    <>
      <Home />
       {/* <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes> */}
    </>
  )
}

export default App
