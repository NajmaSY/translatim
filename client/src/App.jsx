import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  // store our from and to languages in state
  const [from, setFrom] = useState("ar");
  const [to, setTo] = useState("ar");

  // store the word we want to translate in state
  const [word, setWord] = useState("");
  // match - accuracy
  const [translation, setTranslation] = useState("");

  // on submit function that calls our API to get the translation
  async function handleTranslate(event) {
    event.preventDefault();
    const API = `http://localhost:8080/translate?word=${word}&from=${from}&to=${to}`;
    const res = await axios.get(API);
    setTranslation(res.data.translation);
  }
  // unsplash - MY_UNSPLASH_API, unsplash res, rename API and res when using more than one API to use it more than once

  return (
    <>
      <form onSubmit={handleTranslate}>
        <div className="container">
          {/* on change function for the from and to states */}
          <select onChange={(event) => setFrom(event.target.value)}>
            <option value="ar">Arabic</option>
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
          </select>
          {/* on change function for the input of the word we want to translate */}
          <input
            placeholder="Translate"
            onChange={(event) => setWord(event.target.value)}
          />
        </div>

        <div className="container">
          <select onChange={(event) => setTo(event.target.value)}>
            <option value="ar">Arabic</option>
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
          </select>
          <div className="output">{translation}</div>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}

export default App;
