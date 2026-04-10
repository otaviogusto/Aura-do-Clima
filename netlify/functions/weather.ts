import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  const city = event.queryStringParameters?.city;
  const apiKey = process.env.HG_BRASIL_API_KEY || "768456eb";
  
  let url = `https://api.hgbrasil.com/weather?key=${apiKey}&format=json-cors`;
  if (city) {
    url += `&city_name=${encodeURIComponent(city)}`;
  } else {
    // Note: on Netlify Functions, event.headers['client-ip'] might be useful
    // but the API supports 'remote' to detect by IP
    url += `&user_ip=remote`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather data" }),
    };
  }
};
