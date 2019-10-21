import React, { Component } from "react";
import axios from "axios";
import CardAtual from "./components/cardAtual";
import CardMoney from "./components/cardMoney";
import CardForecast from "./components/cardForecast";
import moment from "moment";
import 'moment/min/locales';

let intervalID = 0;
let contAtualiza = -1;
let keyMoney = "c55e6599";
let urlCurrent = "http://apiadvisor.climatempo.com.br/api/v1/weather/locale/5092/current?token=dc6f6ed5c4208bcb02afb1890ad464b5";
let urlForecast = "http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/5092/days/15?token=dc6f6ed5c4208bcb02afb1890ad464b5";
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
    let bitcoin = retorno.data.results.bitcoin.mercadobitcoin.buy.toLocaleString("pt-BR", formato);
    let ibovespa = retorno.data.results.stocks.IBOVESPA.points;
    this.setState({ dolar, euro, peso, bitcoin, ibovespa });
  };

  imagem(){
    let texto = arguments[0];
    if (texto === "1") {
      texto = "https://i.ibb.co/31dBP9Q/1.png";
    } else if (texto === "1n") {
      texto = "https://i.ibb.co/S7jGgyk/1n.png"
    }else if (texto === "2") {
      texto = "https://i.ibb.co/Z2DQpyz/2.png";
    }else if (texto === "2n") {
      texto = "https://i.ibb.co/61yTZFL/2n.png";
    }else if (texto === "2r") {
      texto = "https://i.ibb.co/5jCZtwV/2r.png";
    }else if (texto === "2rn") {
      texto = "https://i.ibb.co/k1RTz6Q/2rn.png";
    }else if (texto === "3") {
      texto = "https://i.ibb.co/zhhnp9n/3.png";
    }else if (texto === "3") {
      texto = "https://i.ibb.co/fMjp5Cx/3tm.png";
    }else if (texto === "4") {
      texto = "https://i.ibb.co/Sd1c123/4.png";
    }else if (texto === "4n") {
      texto = "https://i.ibb.co/dG2ZxNN/4n.png"; 
    }else if (texto === "4r") {
      texto = "https://i.ibb.co/vHBQbzP/4r.png"; 
    }else if (texto === "4rn") {
      texto = "https://i.ibb.co/sQzdWZL/4rn.png"; 
    }else if (texto === "4t") {
      texto = "https://i.ibb.co/hRFP1dr/4t.png";
    }else if (texto === "4tn") {
      texto = "https://i.ibb.co/Vjr9Q3c/4tn.png";
    }else if (texto === "5") {
      texto = "https://i.ibb.co/qJLmqsJ/5.png";
    }else if (texto === "6") {
      texto = "https://i.ibb.co/J5QQZSd/6.png";
    }else if (texto === "7") {
      texto = "https://i.ibb.co/2ShX2tJ/7.png";
    }else if (texto === "8") {
      texto = "https://i.ibb.co/McBjnVR/8.png";
    }else if (texto === "8n") {
      texto = "https://i.ibb.co/gDT8gcM/8n.png";
    }else if (texto === "9") {
      texto = "https://i.ibb.co/j3bzZXQ/9.png";
    }else if (texto === "9n") {
      texto = "https://i.ibb.co/tHtWmp6/9n.png";
    }
    return texto;
  }


  getWeather = async () => {
    //Requisição da previsao do tempo
    const retorno = await axios.get(urlCurrent);
    const retornoForecast = await axios.get(urlForecast);
    console.log(retornoForecast);
    let text;
    // Inicio dia 01
    let d;
    d = moment(d).format("DD/MM/YYYY HH:mm"); 
    let day0 = moment(d, 'DD/MM/YYYY HH:mm').format("dddd");
    day0 = day0+" - "+d;
    let icon = retorno.data.data.icon;
    console.log(icon);
    icon = this.imagem(icon);
    let current_temp_c = retorno.data.data.temperature;
    let wind = retorno.data.data.wind_velocity;
    let humidity = retorno.data.data.humidity;
    let feels = retorno.data.data.sensation;
    let dirwind = retorno.data.data.wind_direction;
    dirwind = this.convertWind(dirwind);
    text = retorno.data.data.condition;    
    contAtualiza = contAtualiza + 1;     
    // Fim dia 01
    
    // Inicio dia 02    
    let max_temp_2 = retornoForecast.data.data[0].temperature.max;
    let min_temp_2 = retornoForecast.data.data[0].temperature.min;
    let sunrise_2 = retornoForecast.data.data[0].sun.sunrise;
    let sunset_2 = retornoForecast.data.data[0].sun.sunset;
    let text_2 = retornoForecast.data.data[0].text_icon.text.pt;
    let icon2 = retornoForecast.data.data[0].text_icon.icon.morning;
    icon2 = this.imagem(icon2);
    sunset_2 = moment(sunset_2, "h:mm A").format("HH:mm");
    sunrise_2 = moment(sunrise_2,"h:mm A").format("HH:mm");
    d = moment([]);
    d.add(1, "days");
    d = moment(d).format("DD/MM/YYYY");
    let day1 =moment(d, 'DD/MM/YYYY').format("dddd")+" - "+d;
    // Fim dia 02

    // Inicio dia 03
    let max_temp_3 = retornoForecast.data.data[1].temperature.max;
    let min_temp_3 = retornoForecast.data.data[1].temperature.min;
    let sunrise_3 = retornoForecast.data.data[1].sun.sunrise;
    let sunset_3 = retornoForecast.data.data[1].sun.sunset;
    let text_3 = retornoForecast.data.data[1].text_icon.text.pt;
    let icon3 = retornoForecast.data.data[1].text_icon.icon.morning;
    icon3 = this.imagem(icon3);
    sunset_3 = moment(sunset_3, "h:mm A").format("HH:mm");
    sunrise_3 = moment(sunrise_3,"h:mm A").format("HH:mm");
    d = moment([]);
    d.add(2, "days");
    d = moment(d).format("DD/MM/YYYY");
    let day2 =moment(d, 'DD/MM/YYYY').format("dddd")+" - "+d;
    // Fim dia 03

    let max_temp_4 = retornoForecast.data.data[2].temperature.max;
    let min_temp_4 = retornoForecast.data.data[2].temperature.min;
    let sunrise_4 = retornoForecast.data.data[2].sun.sunrise;
    let sunset_4 = retornoForecast.data.data[2].sun.sunset;
    let text_4 = retornoForecast.data.data[2].text_icon.text.pt;
    let icon4 = retornoForecast.data.data[2].text_icon.icon.morning;
    icon4 = this.imagem(icon4);
    sunset_4 = moment(sunset_4, "h:mm A").format("HH:mm");
    sunrise_4 = moment(sunrise_4,"h:mm A").format("HH:mm");
    d = moment([]);
    d.add(3, "days");
    d = moment(d).format("DD/MM/YYYY");
    let day3 =moment(d, 'DD/MM/YYYY').format("dddd")+" - "+d;
 
    // Fim dia 04*/

    // Setando os estados do dia 01
    this.setState({
      weatherCurrent: {       
        current_temp_c,
        wind,
        humidity,
        feels,
        dirwind,        
        text,
        data: day0,
        icon,
        atualiza : contAtualiza
      }
    });
    
    // Setando os estados do dia 02
    this.setState({
      weatherOne: {
        max: max_temp_2,
        min: min_temp_2,
        sunrise: sunrise_2,
        sunset: sunset_2,
        data: day1,
        text: text_2,
        icone: icon2
      }
    });
    
    // Setando os estados do dia 03
    this.setState({
      weatherTwo: {
        max: max_temp_3,
        min: min_temp_3,
        sunrise: sunrise_3,
        sunset: sunset_3,
        data: day2,
        text: text_3,
        icone: icon3
      }
    });
    this.setState({
      weatherThree: {
        max: max_temp_4,
        min: min_temp_4,
        sunrise: sunrise_4,
        sunset: sunset_4,
        data: day3,
        text: text_4 ,
        icone:icon4
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