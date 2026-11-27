const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';

const FALLBACK_LOCATION = {
  latitude: 22.5726,
  longitude: 88.3639,
  label: 'Kolkata, West Bengal',
};

const WEATHER_CODES = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Light rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Light snowfall',
  73: 'Moderate snowfall',
  75: 'Heavy snowfall',
  77: 'Snow grains',
  80: 'Light rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Light snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with light hail',
  99: 'Thunderstorm with heavy hail',
};

const fetchJson = async (url) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('Weather service unavailable');
    return await response.json();
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error('Weather lookup timed out. Please try again.');
    if (error instanceof TypeError) throw new Error('Could not reach the weather service. Check your connection and try again.');
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

const getRequestedPlace = (query) => {
  const matches = [...query.matchAll(/\b(?:in|at|near|around|for)\s+([^?!]+)/gi)];
  for (const match of matches.reverse()) {
    const place = match[1]
      .replace(/\s+(?:for|on)\s+(?:right now|currently|today|tonight|tomorrow|this week|next week|this weekend|the weekend)\b.*$/i, '')
      .replace(/\b(?:right now|currently|today|tonight|tomorrow|please|for me|this week|next week|this weekend|the weekend)\b.*$/i, '')
      .trim()
      .replace(/[.,]+$/, '');

    if (place && !/^(me|here|outside|my area|my location|the moment)$/i.test(place)) return place;
  }
  return null;
};

const geocodePlace = async (place) => {
  const params = new URLSearchParams({ name: place, count: '1', language: 'en', format: 'json' });
  const result = await fetchJson(`${GEOCODING_API}?${params}`);
  const match = result.results?.[0];
  if (!match) throw new Error('I could not find that place. Try a city and country, such as “weather in Kolkata, India.”');

  const label = [match.name, match.admin1, match.country]
    .filter((part, index, parts) => part && parts.indexOf(part) === index)
    .join(', ');

  return { latitude: match.latitude, longitude: match.longitude, label };
};

const getBrowserLocation = () => new Promise((resolve, reject) => {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    reject(new Error('Location is unavailable'));
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => resolve({
      latitude: coords.latitude,
      longitude: coords.longitude,
      label: 'Your current location',
    }),
    reject,
    { enableHighAccuracy: false, maximumAge: 10 * 60 * 1000, timeout: 7000 },
  );
});

const getWindDirection = (degrees) => {
  if (!Number.isFinite(degrees)) return '';
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(degrees / 22.5) % directions.length];
};

export const getCurrentWeatherReport = async (query) => {
  const requestedPlace = getRequestedPlace(query);
  let location;
  let usedFallback = false;

  if (requestedPlace) {
    location = await geocodePlace(requestedPlace);
  } else {
    try {
      location = await getBrowserLocation();
    } catch {
      location = FALLBACK_LOCATION;
      usedFallback = true;
    }
  }

  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m',
    timezone: 'auto',
  });
  const forecast = await fetchJson(`${WEATHER_API}?${params}`);
  const current = forecast.current;

  if (!current || !Number.isFinite(current.temperature_2m)) {
    throw new Error('Current weather data is unavailable right now. Please try again shortly.');
  }

  const temperature = current.temperature_2m;
  const feelsLike = current.apparent_temperature;
  const fahrenheit = (temperature * 9 / 5) + 32;
  const condition = WEATHER_CODES[current.weather_code] || 'Conditions unavailable';
  const windDirection = getWindDirection(current.wind_direction_10m);
  const wind = Number.isFinite(current.wind_speed_10m)
    ? `${Math.round(current.wind_speed_10m)} km/h${windDirection ? ` ${windDirection}` : ''}`
    : 'Unavailable';
  const reportedAt = [current.time?.replace('T', ' '), forecast.timezone_abbreviation || forecast.timezone]
    .filter(Boolean)
    .join(' ');
  const fallbackNote = usedFallback
    ? '\n\nBrowser location was unavailable, so this report uses Kolkata, West Bengal.'
    : '';

  return {
    text: `**Current Weather — ${location.label}**\n\n- **Conditions:** ${condition}\n- **Temperature:** ${temperature.toFixed(1)}°C (${fahrenheit.toFixed(1)}°F)\n- **Feels like:** ${Number.isFinite(feelsLike) ? `${feelsLike.toFixed(1)}°C` : 'Unavailable'}\n- **Humidity:** ${Number.isFinite(current.relative_humidity_2m) ? `${current.relative_humidity_2m}%` : 'Unavailable'}\n- **Wind:** ${wind}\n- **Updated:** ${reportedAt || 'Current model update'}${fallbackNote}\n\nLocation is sent to Open-Meteo for this lookup.`,
    actions: [
      { label: 'Weather data by Open-Meteo', link: 'https://open-meteo.com/', external: true, icon: 'external' },
      ...(requestedPlace ? [{ label: 'Place data by GeoNames', link: 'https://www.geonames.org/', external: true, icon: 'external' }] : []),
    ],
  };
};
