import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/pages/Layout/Layout";
import Login from "./components/pages/Login/Login";
import SingUp from "./components/pages/SingUp/SingUp";
import Home from './components/Dashboard/Home/Home'
import Tag from './components/Dashboard/Tag/Tag'
import Expense from './components/Dashboard/Expense/Expense'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SingUp />} />
        <Route path="/login" element={<Login />} />
        {/* dashboard */}
        <Route path="/dashboard/" element={<Layout />}>
          <Route path='/dashboard/Home' element={<Home />} />
          <Route path='/dashboard/Tag' element={<Tag />} />
          <Route path="/dashboard/Expense" element={<Expense/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
