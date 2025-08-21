//import React from "react";  
//import "./i18n";
//import i18n from "i18next";
//import Hello from "./Hello";

//export default function App() {
  //return (
    //<main style={{ padding: 24, textAlign: "center", fontFamily: "system-ui" }}>
      //<h1>i18next Demo</h1>
      //<div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
        //<button onClick={() => i18n.changeLanguage("en")}>English</button>
        //<button onClick={() => i18n.changeLanguage("es")}>Español</button>
      //</div>
      //<Hello name="Bang" count={3} />
    //</main>
  //);
//}
//import React from "react";
//import ContactForm from "./components/ContactForm";

//export default function App() {
  //return (
    //<main style={{ padding: 24 }}>
    //  <h1>Formik + Yup Demo</h1>
      //<ContactForm />
    //</main>
  //);
//}
//import React from "react";
//import BigListMemo from "./components/BigListMemo";

//export default function App() {
  //return (
    //<main style={{ padding: 24 }}>
      //<h1>React Performance – useMemo</h1>
      //<BigListMemo />
    //</main>
  //);
//}
//.import React from "react";
//import UseCallbackDemo from "./components/UseCallbackDemo";

//export default function App() {
  //return (
    //<main style={{ padding: 24 }}>
      //<h1>React Hooks – useCallback</h1>
      //<UseCallbackDemo />
    //</main>
  //);
//}
//import React from "react";
//import UseEffectDemo from "./components/UseEffectDemo";

//export default function App() {
  //return (
    //<main style={{ padding: 24 }}>
      //<h1>React Hooks – useEffect</h1>
      //<UseEffectDemo />
    //</main>
  //);
//}
//import React from "react";
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import Home from "./pages/Home.jsx";
//import Profile from "./pages/Profile.jsx";

//export default function App() {
  //return (
    //<Router>
      //<nav style={{ marginBottom: "20px" }}>
        //<Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        //<Link to="/profile">Profile</Link>
      //</nav>

      //<Routes>
        //<Route path="/" element={<Home />} />
        //<Route path="/profile" element={<Profile />} />
      //</Routes>
    //</Router>
  //);
//}
//import React from "react";
//import TodoForm from "./components/TodoForm.jsx";

//export default function App() {
  //return (
    //<div>
      //<TodoForm />
    //</div>
  //);
//}
//import React from "react";
//import Counter from "./components/Counter";

//export default function App() {
  //return (
    //<div className="min-h-screen flex items-center justify-center bg-gray-100">
      //<Counter />
    //</div>
  //);
//}
//import React from "react";
//import HelloWorld from "./components/HelloWorld.jsx";

//function App() {
  //return (
    //<div className="min-h-screen flex items-center justify-center bg-gray-50">
      //<HelloWorld name="Bang" />
    //</div>
  //);
//}

//export default App;
//import React from "react";
//import BuggyCounter from "./components/BuggyCounter.jsx";
//import FixedCounter from "./components/FixedCounter.jsx";

//export default function App() {
  //return (
    //<main style={{ padding: 24, fontFamily: "system-ui" }}>
      //<BuggyCounter />
      //<hr />
      //<FixedCounter />
    //</main>
  //);
//}
import Header from './components/Header';
import CounterView from './components/CounterView';
import React from "react";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <CounterView />
      </main>
    </>
  )
}








