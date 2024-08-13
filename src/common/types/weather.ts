export interface IAPIWeather {
  coord: ICoord;
  weather: IWeather[];
  base: string;
  main: IMain;
  visibility: number;
  wind: IWind;
  clouds: IClouds;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  forecast: IAPIForecast;
}

export interface IAPIForecast {
  cod: string;
  message: number;
  cnt: number;
  list: IList[];
  city: ICity;
}

interface ICoord {
  lon: number;
  lat: number;
}

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface IWind {
  speed: number;
  deg: number;
  gust: number;
}

interface IClouds {
  all: number;
}

interface ISys {
  country: string;
  sunrise: number;
  sunset: number;
}

interface IList {
  dt: number;
  main: IMain;
  weather: IWeather[];
  clouds: IClouds;
  wind: IWind;
  visibility: number;
  pop: number;
  sys: ISys;
  dt_txt: string;
  rain?: IRain;
}

interface IRain {
  '3h': number;
}
interface ICity {
  id: number;
  name: string;
  coord: ICoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
