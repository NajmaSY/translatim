import "./App.css";
import { useState } from "react";
import axios from "axios";

export default function App() {
  // store our from and to languages in state
  const [from, setFrom] = useState("ar");
  const [to, setTo] = useState("ar");

  // store the word we want to translate in state
  const [word, setWord] = useState("");
  // match - accuracy
  const [translation, setTranslation] = useState("");

  const [gif, setGif] = useState("");

  // on submit function that calls our API to get the translation
  async function handleTranslate(event) {
    event.preventDefault();
    const API = `https://translatim-gddj.onrender.com/translate?word=${word}&from=${from}&to=${to}`;

    const res = await axios.get(API);
    setTranslation(res.data.translation);
    setGif(res.data.image);
  }
  // unsplash - MY_UNSPLASH_API, unsplash res, rename API and res when using more than one API to use it more than once

  return (
    <>
      <h1>Translatim</h1>
      <div className="translate-container">
        <div className="column-container">
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
          <button onClick={handleTranslate}>Submit</button>
        </div>
        {/* <h2 className="output">{translation.translation}</h2> */}
        <img src={gif} alt="related gif" className="gif" />
      </div>
    </>
  );
}
