import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";

export default function App(){
 return(
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<CreateAccount/>}/>
   </Routes>
  </BrowserRouter>
 );
}
