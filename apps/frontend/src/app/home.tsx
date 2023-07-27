import {LoginPage, RegistrationPage} from "@platform/site-pages";
import {Link, Routes, Route} from 'react-router-dom'

export function Home() {
  return(
    <>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
      <Routes>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegistrationPage/>}></Route>
      </Routes>
      <h1>Hello</h1>
      <LoginPage/>
      <RegistrationPage/>
    </>
  );
}
