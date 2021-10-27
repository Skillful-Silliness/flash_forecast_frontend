import React, { useEffect, useState } from "react";

import throttle from "lodash/throttle";
import { ChakraProvider, Container } from "@chakra-ui/react";

import { apiGetStatus, apiSetBrightness, apiSetLightsOn } from "../utils/api";

import Controls from "./Controls";
import CurrentWeather from "./CurrentWeather";
import Debug from "./Debug";

import "../globalStyles.css";

const App = () => {
  const [brightness, setBrightness] = useState(null);
  const [lightsOn, setLightsOn] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);

  function setStatus({ brightness, currentWeather, lightsOn }) {
    setBrightness(brightness);
    setCurrentWeather(currentWeather);
    setLightsOn(lightsOn);
  }

  useEffect(() => {
    apiGetStatus(setStatus);

    const interval = setInterval(() => apiGetStatus(setStatus), 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onBrightnessChange = throttle(
    (value) => apiSetBrightness(value, setBrightness),
    50
  );

  return (
    <ChakraProvider>
      <Container p="4">
        <Controls
          brightness={brightness}
          lightsOn={lightsOn}
          onBrightnessChange={onBrightnessChange}
          onLightsOnChange={(e) =>
            apiSetLightsOn(e.target.checked, setLightsOn)
          }
        />
        <section>
          <CurrentWeather data={currentWeather} />
        </section>
        <Debug />
      </Container>
    </ChakraProvider>
  );
};

export default App;
