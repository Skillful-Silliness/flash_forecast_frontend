import React from "react";

const buildIconSrc = (icon, is2x = false) =>
  `http://openweathermap.org/img/wn/${icon}${is2x ? "@2x" : ""}.png`;

const formatDateTime = (timestamp) =>
  new Date(timestamp).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const timestamp = data.dt * 1000;

  const icon = data.weather[0].icon;

  return (
    <div style={{ marginTop: 48 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <section
          style={{
            background: "#aaf0d1",
            borderRadius: 12,
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px 32px",
          }}
        >
          <h3>{data.name}</h3>
          {formatDateTime(timestamp)}
          <div>
            <img
              src={buildIconSrc(icon)}
              srcSet={`${buildIconSrc(icon, true)} 2x`}
              style={{ height: 50, width: 50 }}
            />
          </div>
          <div>{` ${data.weather[0].description}`}</div>
          <div>{`${Math.round(data.main.temp)}°F`}</div>
        </section>
      </div>
    </div>
  );
};

export default CurrentWeather;
