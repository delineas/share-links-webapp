import React, { useState } from "react";
import "./App.css";
import FacebookLink from "./FacebookLink";
import TwitterLink from "./TwitterLink";
import { CSSTransition } from "react-transition-group";

const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

function App() {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const inputError = url != "" && !validURL(url);
  const showLinks = url != "" && !inputError;

  const handleURLChange = ({ target }) => {
    setUrl(target.value);
  };
  const handleDescriptionChange = ({ target }) => {
    setDescription(target.value);
  };

  return (
    <div className="app">
      <input
        type="url"
        value={url}
        onChange={handleURLChange}
        placeholder="Tu URL para compartir aquí"
        className={inputError ? "error" : ""}
      />

      <CSSTransition
        in={showLinks}
        timeout={1000}
        classNames="show-links-transition"
        unmountOnExit
        appear
      >
        <textarea
          placeholder="Tu descripción opcional aquí"
          onChange={handleDescriptionChange}
          value={description}
        ></textarea>
      </CSSTransition>
      <CSSTransition
        in={showLinks}
        timeout={1000}
        classNames="show-links-transition"
        unmountOnExit
        appear
      >
        <div className="links">
          <TwitterLink url={url} description={description}></TwitterLink>
          <FacebookLink url={url} description={description}></FacebookLink>
        </div>
      </CSSTransition>

    </div>
  );
}

export default App;
