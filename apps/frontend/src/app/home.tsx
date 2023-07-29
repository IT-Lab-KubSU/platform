import {LoginPage, RegistrationPage} from "@platform/site-pages";
import {Link, Routes, Route} from 'react-router-dom'

export function Home() {
  return (
    <div>
      <ul className="text-white text-3xl flex items-center justify-between bg-amber-300 w-screen mx-auto px-10 py-5">
        <li className="hover:text-blue-600"><Link to="/login">Login</Link></li>
        <li className="shover:text-blue-600"><Link to="/register">Register</Link></li>
        <li className="hover:text-blue-600"><Link to="/">Home</Link></li>
      </ul>
      <div className="">
        <h2>Home page</h2>
      </div>
      <div className="mx-auto flex justify-center mt-3.5">
        <Routes>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegistrationPage/>}></Route>
        </Routes>
      </div>
    </div>
  );
}
