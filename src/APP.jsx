import React, { Component } from "react";
import axios from "axios";
import CardAtual from "./Components/cardAtual";
import CardMoney from "./Components/cardMoney";
import CardForecast from "./Components/cardForecast";


let intervalID = 0;
let url = "http://api.apixu.com/v1/forecast.json?key=3cb2d33176324796985133100191402&q=-27.192396,-48.498516&days=4";
let urlTexto = "http://www.apixu.com/doc/conditions.json";
let formato = { minimumFractionDigits: 3, style: "currency", currency: "BRL" };
var moment = require("moment");

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

export default class APP extends Component {
  state = {
    dolar: 0,
    euro: 0,
    peso: 0,
    bitcoin: 0,
    ibovespa: 0,
    hora: 0,
    texto:0,
    weatherCurrent: {},
    weatherOne: {},
    weatherTwo: {},
    weatherThree: {}
  };


  getTime = () => {
    setInterval(() => {
      let d = new Date();
      this.setState({ hora: d.toLocaleTimeString() });
    }, 1000);
  };

  getMoney = () => {
    intervalID = setInterval(async () => {
      this.getData();
      this.getWeather();
    }, 1000 * 60 * 30);
  };

  getData = async () => {
    const retorno = await axios.get("https://api.hgbrasil.com/finance/quotations?format=json-cors&key=25bcb38");
    let dolar = retorno.data.results.currencies.USD.buy.toLocaleString('pt-BR', formato);
    let euro = retorno.data.results.currencies.EUR.buy.toLocaleString('pt-BR', formato);
    let peso = retorno.data.results.currencies.ARS.buy.toLocaleString('pt-BR', formato);
    let bitcoin = retorno.data.results.currencies.BTC.buy.toLocaleString('pt-BR', formato);
    let ibovespa = retorno.data.results.stocks.IBOVESPA.points;    
    
    this.setState({ dolar, euro, peso, bitcoin, ibovespa });
  };

  converte() {
    let auxDirecao = arguments[0];

    if (auxDirecao === "S") {
      auxDirecao = "VENTO SUL";
    } else if (auxDirecao === "N") {
      auxDirecao = "VENTO NORTE";
    } else if (auxDirecao === "E") {
      auxDirecao = "VENTO LESTE";
    } else if (auxDirecao === "W") {
      auxDirecao = "VENTO OESTE";
    } else if (auxDirecao === "SSW") {
      auxDirecao = "VENTO SUDOESTE";
    } else if (auxDirecao === "SW") {
      auxDirecao = "VENTO SUDOESTE";
    } else if (auxDirecao === "WSW") {
      auxDirecao = "VENTO SUDOESTE";
    } else if (auxDirecao === "WNW") {
      auxDirecao = "VENTO NOROESTE";
    } else if (auxDirecao === "NW") {
      auxDirecao = "VENTO NOROESTE";
    } else if (auxDirecao === "NNW") {
      auxDirecao = "VENTO NOROESTE";
    } else if (auxDirecao === "NNE") {
      auxDirecao = "VENTO NORDESTE";
    } else if (auxDirecao === "NE") {
      auxDirecao = "VENTO NORDESTE";
    } else if (auxDirecao === "ENE") {
      auxDirecao = "VENTO NORDESTE";
    } else if (auxDirecao === "ESE") {
      auxDirecao = "VENTO SUDESTE";
    } else if (auxDirecao === "SE") {
      auxDirecao = "VENTO SUDESTE";
    } else if (auxDirecao === "SSE") {
      auxDirecao = "VENTO SUDESTE";
    }

    return auxDirecao;
  }

  getWeather = async () => {
    const retorno = await axios.get(url);
    let text;
    // dia atual
    var semana = [" - Domingo", " - Segunda-Feira", " - Terça-Feira", " - Quarta-Feira", " - Quinta-Feira", " - Sexta-Feira", " - Sábado"];
    var look = new Date();
    let d = moment([]);
    d = moment(d).format("DD/MM/YYYY");
    let day0 = d +semana[look.getDay()];
    let current_temp_c = retorno.data.current.temp_c;
    let wind = retorno.data.current.wind_kph;
    let humidity = retorno.data.current.humidity;
    let feels = retorno.data.current.feelslike_c;
    let dirwind = retorno.data.current.wind_dir;
    let code = retorno.data.current.condition.code;
    let icon = retorno.data.current.condition.icon;
    let aux_data = retorno.data.current.last_updated;
    let aux_sunset = retorno.data.forecast.forecastday[0].astro.sunset;
    let aux_sunrise = retorno.data.forecast.forecastday[0].astro.sunrise;
    let aux_moonset = retorno.data.forecast.forecastday[0].astro.moonset;
    let aux_moonrise = retorno.data.forecast.forecastday[0].astro.moonrise;
    let max_temp = retorno.data.forecast.forecastday[0].day.maxtemp_c;
    let min_temp = retorno.data.forecast.forecastday[0].day.mintemp_c;
    let is_day = retorno.data.current.is_day;
    let moonrise;
    if(aux_moonrise === 'No moonrise'){
      moonrise = 'N/A';
    }else{
      moonrise = moment(aux_moonrise, "h:mm A").format("HH:mm");
    }
    let date_refresh = moment(aux_data).format("DD/MM/YYYY HH:mm");
    let sunset = moment(aux_sunset, "h:mm A").format("HH:mm");
    let sunrise = moment(aux_sunrise, "h:mm A").format("HH:mm");
    let moonset = moment(aux_moonset, "h:mm A").format("HH:mm");
    
    
    dirwind = this.converte(dirwind);
    let i;
    const texto = await axios.get(urlTexto);

    for (i = 0; i < 48; i++) {
      let aux = texto.data[i].code;

      if (code === aux) {
        if (is_day === 1) {
          text = texto.data[i].languages[20].day_text;
        } else {
          text = texto.data[i].languages[20].night_text;
        }
      }
    }

    text = text.replace(/\b\w/g, function (l) {
      return l.toUpperCase();
    });

    // dia 02
    
    d = moment([]);
    d.add(1,'days');
    d = moment(d).format("DD/MM/YYYY");
    let day1 = 'AMANHÃ -' +d;
    let icon_2 = retorno.data.forecast.forecastday[1].day.condition.icon;
    let max_temp_2 = retorno.data.forecast.forecastday[1].day.maxtemp_c;
    let min_temp_2 = retorno.data.forecast.forecastday[1].day.mintemp_c;
    let aux_sunset_2 = retorno.data.forecast.forecastday[1].astro.sunset;
    let aux_sunrise_2 = retorno.data.forecast.forecastday[1].astro.sunrise;
    let code_2 = retorno.data.forecast.forecastday[1].day.condition.code;
    let sunset_2 = moment(aux_sunset_2, "h:mm A").format("HH:mm");
    let sunrise_2 = moment(aux_sunrise_2, "h:mm A").format("HH:mm");

    let text_2;
    for (i = 0; i < 48; i++) {
      let aux = texto.data[i].code;
      if (code_2 === aux) {
        text_2 = texto.data[i].languages[20].day_text;
      }
    }
    text_2 = text_2.replace(/\b\w/g, function (l) {
      return l;
    });

    // dia 03    
    d = moment([]);
    d.add(2,'days');
    d = moment(d).format("DD/MM/YYYY");
    let day2 = d;
    let icon_3 = retorno.data.forecast.forecastday[2].day.condition.icon;
    let max_temp_3 = retorno.data.forecast.forecastday[2].day.maxtemp_c;
    let min_temp_3 = retorno.data.forecast.forecastday[2].day.mintemp_c;
    let aux_sunset_3 = retorno.data.forecast.forecastday[2].astro.sunset;
    let aux_sunrise_3 = retorno.data.forecast.forecastday[2].astro.sunrise;
    let code_3 = retorno.data.forecast.forecastday[2].day.condition.code;
    let sunset_3 = moment(aux_sunset_3, "h:mm A").format("HH:mm");
    let sunrise_3 = moment(aux_sunrise_3, "h:mm A").format("HH:mm");

    let text_3;
    for (i = 0; i < 48; i++) {
      let aux = texto.data[i].code;
      if (code_3 === aux) {
        text_3 = texto.data[i].languages[20].day_text;
      }
    }
    text_3 = text_3.replace(/\b\w/g, function (l) {
      return l.toUpperCase();
    });

    // dia 04
    d = moment([]);
    d.add(3,'days');
    d = moment(d).format("DD/MM/YYYY");
    let day3 = d;
    let icon_4 = retorno.data.forecast.forecastday[3].day.condition.icon;
    let max_temp_4 = retorno.data.forecast.forecastday[3].day.maxtemp_c;
    let min_temp_4 = retorno.data.forecast.forecastday[3].day.mintemp_c;
    let aux_sunset_4 = retorno.data.forecast.forecastday[3].astro.sunset;
    let aux_sunrise_4 = retorno.data.forecast.forecastday[3].astro.sunrise;
    let code_4 = retorno.data.forecast.forecastday[3].day.condition.code;
    let sunset_4 = moment(aux_sunset_4, "h:mm A").format("HH:mm");
    let sunrise_4 = moment(aux_sunrise_4, "h:mm A").format("HH:mm");

    let text_4;
    for (i = 0; i < 48; i++) {
      let aux = texto.data[i].code;
      if (code_4 === aux) {
        text_4 = texto.data[i].languages[20].day_text;
      }
    }
    text_4 = text_4.replace(/\b\w/g, function (l) {
      return l.toUpperCase();
    });

    this.setState({
      weatherCurrent: {
        current_temp_c,
        wind,
        humidity,
        feels,
        dirwind,
        code,
        icon,
        date_refresh,
        sunset,
        sunrise,
        max_temp,
        min_temp,
        text,
        moonset,
        moonrise,
        is_day,
        data : day0
      }
    });

    this.setState({
      weatherOne: { icone: icon_2, max: max_temp_2, min: min_temp_2, code: code_2, sunset: sunset_2, sunrise: sunrise_2, text: text_2, data : day1 }
    });

    this.setState({
      weatherTwo: { icone: icon_3, max: max_temp_3, min: min_temp_3, code: code_3, sunset: sunset_3, sunrise: sunrise_3, text: text_3,data:day2 }
    });

    this.setState({
      weatherThree: { icone: icon_4, max: max_temp_4, min: min_temp_4, code: code_4, sunset: sunset_4, sunrise: sunrise_4, text: text_4,data : day3 }
    });
  };

  componentDidMount() {
    this.getData();
    this.getWeather();
    this.getMoney();
    this.getTime();
  }

  componentWillUnmount() {
    clearInterval(intervalID);
  }

  clicado =(e)=>{
    console.log(e.target.value);
  }

  render() {
    return (
      <div class="card bg-white text-black">
        <div className="row font-weight-bold">
          <CardAtual weatherCurrent={this.state.weatherCurrent} onClick={this.clicado} />
          <CardMoney geral={this.state}/>
        </div>
        <div className='row' style={{ marginLeft: '0px', marginRight: '0px', lineHeight:'$lh' }}>
          <CardForecast weatherOne={this.state.weatherOne} />
          <CardForecast weatherOne={this.state.weatherTwo} />
          <CardForecast weatherOne={this.state.weatherThree} />
        </div>
      </div>
    );
  }
}
