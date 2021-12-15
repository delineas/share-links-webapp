import React, { useState, useRef } from "react";
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

// localhost:3000
// ?url=
// &description=
// http://localhost:3000/?url=https://perico.com&description=Este%20enlace%20me%20mola

const urlParams = new URL(window.location);

function App() {

  const [url, setUrl] = useState(() => {
    return urlParams.searchParams.has('url') ? urlParams.searchParams.get('url') : ""
  });
  const [description, setDescription] = useState(() => {
    return urlParams.searchParams.has("description")
      ? urlParams.searchParams.get("description")
      : "";
  });

  const inputError = url !== "" && !validURL(url);
  const showLinks = url !== "" && !inputError;

  const handleURLChange = ({ target }) => {
    setUrl(target.value);
  };
  const handleDescriptionChange = ({ target }) => {
    setDescription(target.value);
  };

  const nodeRef = useRef(null);

  return (
    <div className="app">
      <input
        type="url"
        value={url}
        onChange={handleURLChange}
        placeholder="Tu URL para compartir aquí"
        className={inputError ? "error" : ""}
        autoFocus
        data-testid="input-url"
      />

      <CSSTransition
        in={showLinks}
        timeout={1000}
        classNames="show-links-transition"
        unmountOnExit
        appear
        nodeRef={nodeRef}
      >
        <div className="links">
          <textarea
            placeholder="Tu descripción opcional aquí"
            onChange={handleDescriptionChange}
            value={description}
          ></textarea><br/>
          <TwitterLink url={url} description={description}></TwitterLink>
          <FacebookLink url={url} description={description}></FacebookLink>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
