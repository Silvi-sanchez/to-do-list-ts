
//import { BrowserRouter as Routes, Route, } from 'react-router-dom';
import React, { FC, Fragment } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import List from "./pages/List.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path='/' element={<List />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='*' element={<List />} />
        </Routes>

      </Fragment>
    </BrowserRouter >
  );
}
export default App;
