import React, { Component } from "react";
import axios from "axios";
import CardAtual from "./components/cardAtual";
import CardMoney from "./components/cardMoney";
import CardForecast from "./components/cardForecast";
import moment from "moment";
import 'moment/min/locales';

let intervalID = 0;
let keyMoney = "c55e6599";
let keyWeather = "3cb2d33176324796985133100191402";
let url = "http://api.apixu.com/v1/forecast.json?key="+keyWeather+"&q=-27.192396,-48.498516&days=4";
let urlTexto = "http://www.apixu.com/doc/conditions.json";
let urlMoney = "https://api.hgbrasil.com/finance/quotations?format=json-cors&key="+keyMoney;
let formato = { minimumFractionDigits: 3, style: "currency", currency: "BRL" };

moment.locale("pt-BR");

export default class APP extends Component {
  state = {
    dolar: 0,
    euro: 0,
    peso: 0,
    bitcoin: 0,
    ibovespa: 0,
    hora: 0,
    texto: 0,
    weatherCurrent: {},
    weatherOne: {},
    weatherTwo: {},
    weatherThree: {}
  };

  getTime = () => {
    //atualiza estado do relógio a cada segundo
    setInterval(() => {
      let d = new Date();
      d = d.toLocaleTimeString() ;      
      d = moment().format("HH:mm");       
      this.setState({ hora: d});
    }, 1000);
  };

  getMoney = () => {
    //Atualiza dados monetários e tempo a cada 30 minutos
    intervalID = setInterval(async () => {
      this.getData();
      this.getWeather();
    }, 1000 * 60 * 30);
  };

  getData = async () => {
    //Requisição para buscar dados monetários, também atualiza os estados das variáveis  
    const retorno = await axios.get(urlMoney);
    let dolar = retorno.data.results.currencies.USD.buy.toLocaleString("pt-BR", formato);
    let euro = retorno.data.results.currencies.EUR.buy.toLocaleString("pt-BR", formato);
    let peso = retorno.data.results.currencies.ARS.buy.toLocaleString("pt-BR", formato);
    let bitcoin = retorno.data.results.currencies.BTC.buy.toLocaleString("pt-BR", formato);
    let ibovespa = retorno.data.results.stocks.IBOVESPA.points;
    this.setState({ dolar, euro, peso, bitcoin, ibovespa });
  };

  convertWind() {
    //Traduzindo direção do vento para PT-BR
    let auxDirecao = arguments[0];
    if (auxDirecao === "S") {
      auxDirecao = "Vento Sul";
    } else if (auxDirecao === "N") {
      auxDirecao = "Vento Norte";
    } else if (auxDirecao === "E") {
      auxDirecao = "Vento Leste";
    } else if (auxDirecao === "W") {
      auxDirecao = "Vento Oeste";
    } else if (auxDirecao === "SSW") {
      auxDirecao = "Vento Sudoeste";
    } else if (auxDirecao === "SW") {
      auxDirecao = "Vento Sudoeste";
    } else if (auxDirecao === "WSW") {
      auxDirecao = "Vento Sudoeste";
    } else if (auxDirecao === "WNW") {
      auxDirecao = "Vento Noroeste";
    } else if (auxDirecao === "NW") {
      auxDirecao = "Vento Noroeste";
    } else if (auxDirecao === "NNW") {
      auxDirecao = "Vento Noroeste";
    } else if (auxDirecao === "NNE") {
      auxDirecao = "Vento Nordeste";
    } else if (auxDirecao === "NE") {
      auxDirecao = "Vento Nordeste";
    } else if (auxDirecao === "ENE") {
      auxDirecao = "Vento Nordeste";
    } else if (auxDirecao === "ESE") {
      auxDirecao = "Vento Sudeste";
    } else if (auxDirecao === "SE") {
      auxDirecao = "Vento Sudeste";
    } else if (auxDirecao === "SSE") {
      auxDirecao = "Vento Sudeste";
    }
    return auxDirecao;
  }

  removeAcent() {
    // Resolvendo erro de acentos nas strings
    var string = arguments[0];
    var mapaAcentosHex 	= {
      a : /[\xE0-\xE6]/g,
      e : /[\xE8-\xEB]/g,
      i : /[\xEC-\xEF]/g,
      o : /[\xF2-\xF6]/g,
      u : /[\xF9-\xFC]/g,
      c : /\xE7/g,
      n : /\xF1/g
    };  
    for ( var letra in mapaAcentosHex ) {
      var expressaoRegular = mapaAcentosHex[letra];
      string = string.replace( expressaoRegular, letra );
    }  
    return string;
  }

  getTextCondition = async(code,is_day)=>{
    // Buscando o texto da condição, direto no indice do PT-BR da requisição
    let i;
    let text;    
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
    // Remove acentuação
    text = this.removeAcent(text.toLowerCase());
    // Primeira letra de cada palavra maiscula
    text = text.replace(/\b\w/g, function(l) {
      return l.toUpperCase();
    });  
    return text;
  }

  getWeather = async () => {
    //Requisição da previsao do tempo
    const retorno = await axios.get(url);
    let text;
    // Inicio dia 01
    let d;
    d = moment(d).format("DD/MM/YYYY");  
    let day0 = moment(d, 'DD/MM/YYYY').format("dddd");
    day0 = day0+" - "+d;
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
    if (aux_moonrise === "No moonrise") {
      moonrise = "N/A";
    } else {
      moonrise = moment(aux_moonrise, "h:mm A").format("HH:mm");
    }
    let date_refresh = moment(aux_data).format("DD/MM/YYYY HH:mm");
    let sunset = moment(aux_sunset, "h:mm A").format("HH:mm");
    let sunrise = moment(aux_sunrise, "h:mm A").format("HH:mm");
    let moonset = moment(aux_moonset, "h:mm A").format("HH:mm");
    dirwind = this.convertWind(dirwind);
    text = await this.getTextCondition(code,is_day);   
    // Fim dia 01

    // Inicio dia 02
    d = moment([]);
    d.add(1, "days");
    d = moment(d).format("DD/MM/YYYY");
    let day1 =moment(d, 'DD/MM/YYYY').format("dddd")+" - "+d;
    let icon_2 = retorno.data.forecast.forecastday[1].day.condition.icon;
    let max_temp_2 = retorno.data.forecast.forecastday[1].day.maxtemp_c;
    let min_temp_2 = retorno.data.forecast.forecastday[1].day.mintemp_c;
    let aux_sunset_2 = retorno.data.forecast.forecastday[1].astro.sunset;
    let aux_sunrise_2 = retorno.data.forecast.forecastday[1].astro.sunrise;
    let code_2 = retorno.data.forecast.forecastday[1].day.condition.code;
    let sunset_2 = moment(aux_sunset_2, "h:mm A").format("HH:mm");
    let sunrise_2 = moment(aux_sunrise_2, "h:mm A").format("HH:mm");
    let text_2;
    text_2= await this.getTextCondition(code_2,1);    
    // Fim dia 02

    // Inicio dia 03
    d = moment([]);
    d.add(2, "days");
    d = moment(d).format("DD/MM/YYYY");
    let day2 = moment(d, 'DD/MM/YYYY').format("dddd")+" - "+d;
    let icon_3 = retorno.data.forecast.forecastday[2].day.condition.icon;
    let max_temp_3 = retorno.data.forecast.forecastday[2].day.maxtemp_c;
    let min_temp_3 = retorno.data.forecast.forecastday[2].day.mintemp_c;
    let aux_sunset_3 = retorno.data.forecast.forecastday[2].astro.sunset;
    let aux_sunrise_3 = retorno.data.forecast.forecastday[2].astro.sunrise;
    let code_3 = retorno.data.forecast.forecastday[2].day.condition.code;
    let sunset_3 = moment(aux_sunset_3, "h:mm A").format("HH:mm");
    let sunrise_3 = moment(aux_sunrise_3, "h:mm A").format("HH:mm");
    let text_3;
    text_3= await this.getTextCondition(code_3,1);
    // Fim dia 03

    // Inicio dia 04
    d = moment([]);
    d.add(3, "days");
    d = moment(d).format("DD/MM/YYYY");
    let day3 = moment(d, 'DD/MM/YYYY').format("dddd")+" - "+d;
    let icon_4 = retorno.data.forecast.forecastday[3].day.condition.icon;
    let max_temp_4 = retorno.data.forecast.forecastday[3].day.maxtemp_c;
    let min_temp_4 = retorno.data.forecast.forecastday[3].day.mintemp_c;
    let aux_sunset_4 = retorno.data.forecast.forecastday[3].astro.sunset;
    let aux_sunrise_4 = retorno.data.forecast.forecastday[3].astro.sunrise;
    let code_4 = retorno.data.forecast.forecastday[3].day.condition.code;
    let sunset_4 = moment(aux_sunset_4, "h:mm A").format("HH:mm");
    let sunrise_4 = moment(aux_sunrise_4, "h:mm A").format("HH:mm");
    let text_4;
    text_4 = await this.getTextCondition(code_4,1);    
    // Fim dia 04
    
    // Setando os estados do dia 01
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
        data: day0
      }
    });

    // Setando os estados do dia 02
    this.setState({
      weatherOne: {
        icone: icon_2,
        max: max_temp_2,
        min: min_temp_2,
        code: code_2,
        sunset: sunset_2,
        sunrise: sunrise_2,
        text: text_2,
        data: day1
      }
    });

    // Setando os estados do dia 03
    this.setState({
      weatherTwo: {
        icone: icon_3,
        max: max_temp_3,
        min: min_temp_3,
        code: code_3,
        sunset: sunset_3,
        sunrise: sunrise_3,
        text: text_3,
        data: day2
      }
    });

    // Setando os estados do dia 04
    this.setState({
      weatherThree: {
        icone: icon_4,
        max: max_temp_4,
        min: min_temp_4,
        code: code_4,
        sunset: sunset_4,
        sunrise: sunrise_4,
        text: text_4,
        data: day3
      }
    });    
  };  

  // Método react invocado após componente ser montado
  componentDidMount() {
    this.getData();
    this.getWeather();
    this.getMoney();
    this.getTime();
  }

  componentWillUnmount() {
    clearInterval(intervalID);
  }

  // Método que renderiza a pagina
  render() {
    return (      
      <div className="card bg-white text-black">
        <div className="row font-weight-bold no-gutters">
          <CardAtual weatherCurrent={this.state.weatherCurrent} onClick={this.clicado} />
          <CardMoney geral={this.state} />
        </div>
        <div className="row" style={{ marginLeft: "0px", marginRight: "0px", lineHeight: "$lh" }}>
          <CardForecast weatherOne={this.state.weatherOne} />
          <CardForecast weatherOne={this.state.weatherTwo} />
          <CardForecast weatherOne={this.state.weatherThree} />
        </div>
      </div>
    );
  }
}