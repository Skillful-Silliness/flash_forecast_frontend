import React from "react";
import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
} from "@chakra-ui/react";

const brightnessIn = (val) => Math.round(val * 100);

const brightnessOut = (val) => val / 100;

const Controls = ({
  brightness,
  lightsOn,
  onBrightnessChange,
  onLightsOnChange,
}) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "30em",
        margin: "0 auto",
      }}
    >
      <FormControl display="flex" flex="1" alignItems="center">
        <FormLabel color="white" htmlFor="lightsOn" mb="0">
          Lights
        </FormLabel>
        <Switch
          colorScheme="cyan"
          id="lightsOn"
          isChecked={lightsOn}
          onChange={onLightsOnChange}
          size="lg"
        />
      </FormControl>
      <FormControl display="flex" flex="1 1 100%" mt="32px" alignItems="center">
        <FormLabel color="white" htmlFor="brightness" flexShrink="0" mb="0">
          {`Brightness ${brightnessIn(brightness)}`}
        </FormLabel>
        <Slider
          colorScheme="cyan"
          id="brightness"
          value={brightnessIn(brightness)}
          onChange={(val) => onBrightnessChange(brightnessOut(val))}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
    </section>
  );
};

export default Controls;
