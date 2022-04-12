/** Core functionality */
function buildQueryString(args) {
  if (!args) return "";

  const pairs = Object.keys(args).map((key) => key + "=" + args[key]);

  if (!pairs.length) return "";

  return "?" + pairs.join("&");
}

function apiRequest(command, args) {
  const query = buildQueryString(args);

  return fetch(`${API_HOST}/api/${command}${query}`).then((response) =>
    response.json()
  );
}

/** Getters */
export function apiGetDebugData(setIsLoading, setDebugData) {
  setIsLoading(true);

  apiRequest("debug")
    .then((res) => {
      setIsLoading(false);
      setDebugData(res);
    })
    .catch(() => {
      setIsLoading(false);
      setDebugData("Something went wrong. Try again");
    });
}

export function apiGetStatus(setStatus) {
  apiRequest("status")
    .then((res) => setStatus(res))
    .catch((err) => console.error(err));
}

/** Setters */
export function apiSetBrightness(brightness, setBrightness) {
  setBrightness(brightness);

  apiRequest("brightness", { v: brightness }).catch((err) =>
    console.error(err)
  );
}

export function apiSetLightsOn(lightsOn, setLightsOn) {
  const command = lightsOn ? "on" : "off";

  apiRequest(command)
    .then(() => setLightsOn(lightsOn))
    .catch((err) => console.error(err));
}
