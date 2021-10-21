import React, { useEffect, useState } from "react";

import styles from "./Root.module.css";

function buildQueryString(args) {
  if (!args) return "";

  const pairs = Object.keys(args).map((key) => key + "=" + args[key]);

  if (!pairs.length) return "";

  return "?" + pairs.join("&");
}

function apiRequest(command, args) {
  const query = buildQueryString(args);

  return fetch("http://192.168.1.150/api/" + command + query)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

function handleButtonClick(e, command, callback) {
  // set loading state

  apiRequest(command)
    .then((res) => {
      // set loading state
      if (callback) callback(res);
    })
    .catch(() => {
      /* set loading state */
    });
}

const Root = () => {
  const [brightness, setBrightness] = useState(null);

  const setBrightnessDisplay = (res) =>
    setBrightness(Math.round(res.brightness * 100));

  function initState() {
    apiRequest("status")
      .then((res) => {
        console.log({ res });
        setBrightnessDisplay(res);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    initState();

    const interval = setInterval(initState, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main>
      <section>
        <h2 className={styles.controlHeader}>Lights</h2>

        <div className={styles.controls}>
          <button
            className={styles.btn}
            onClick={(e) => handleButtonClick(e, "on")}
          >
            On
          </button>
          <button
            className={styles.btn}
            onClick={(e) => handleButtonClick(e, "off")}
          >
            Off
          </button>
        </div>
      </section>

      <section>
        <h2 className={styles.controlHeader}>Brightness</h2>

        <div className={styles.controls}>
          <button
            className={styles.btn}
            onClick={(e) =>
              handleButtonClick(e, "darker", setBrightnessDisplay)
            }
          >
            -
          </button>
          <div className={styles.brightnessDisplay}>{brightness}</div>
          <button
            className={styles.btn}
            onClick={(e) =>
              handleButtonClick(e, "brighter", setBrightnessDisplay)
            }
          >
            +
          </button>
        </div>
      </section>
    </main>
  );
};

export default Root;
