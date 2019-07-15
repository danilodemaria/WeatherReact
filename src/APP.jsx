import React, { Component } from 'react'
import axios from 'axios'

let intervalID = 0;
let url = "http://api.apixu.com/v1/forecast.json?key=3cb2d33176324796985133100191402&q=-27.192396,-48.498516&days=4";
let urlTexto = "http://www.apixu.com/doc/conditions.json";
let formato = { minimumFractionDigits: 3 , style: 'currency', currency: 'BRL' }
var moment = require('moment');

export default class APP extends Component {
    state = {
        dolar : 0,
        euro : 0,
        peso : 0,
        bitcoin : 0,
        ibovespa : 0,
        hora : 0,
        weatherCurrent : {},
        weatherOne: {},
        weatherTwo : {},
        weatherThree : {}
    }

    getTime=()=>{
        
        setInterval(()=>{
            let d = new Date();
            this.setState({hora : d.toLocaleTimeString()});
        },1000)
    }

    getMoney=()=>{

        intervalID = setInterval(async()=>{
            this.getData();
            this.getWeather();
            
        },1000*60*30)        
    }

    getData=async()=>{
        const retorno = await axios.get('https://api.hgbrasil.com/finance/quotations?format=json-cors&key=25bcb38');
            let dolar = retorno.data.results.currencies.USD.buy;
            let euro = retorno.data.results.currencies.EUR.buy;
            let peso = retorno.data.results.currencies.ARS.buy;
            let bitcoin = retorno.data.results.currencies.BTC.buy;
            let ibovespa = retorno.data.results.stocks.IBOVESPA.points;             
            this.setState({dolar,euro,peso,bitcoin,ibovespa});
    }

    converte(){
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

    getWeather=async()=>{
        const retorno = await axios.get(url);
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
        
        let date_refresh = moment(aux_data).format('DD/MM/YYYY HH:mm');
        let sunset = moment(aux_sunset,'h:mm A').format('HH:mm');
        let sunrise = moment(aux_sunrise,'h:mm A').format('HH:mm');
        let moonset = moment(aux_moonset,'h:mm A').format('HH:mm');
        let moonrise = moment(aux_moonrise,'h:mm A').format('HH:mm');

        dirwind = this.converte(dirwind);
        dirwind = dirwind.toLowerCase();
        dirwind = dirwind.replace(/\b\w/g, function(l){ return l.toUpperCase() })

        let i,text;
        const texto = await axios.get(urlTexto);
        
        for (i = 0; i < 48; i++) { 
            let aux = texto.data[i].code;            
            if(code === aux){
                if(is_day === 1){
                    text = texto.data[i].languages[20].day_text;
                }else{
                    text = texto.data[i].languages[20].nigth_text;
                }
            }
        }

        text = text.replace(/\b\w/g, function(l){ return l.toUpperCase() })
        
        
        this.setState({weatherCurrent : {current_temp_c,wind,humidity,feels,
            dirwind,code,icon,date_refresh,sunset,sunrise,max_temp,min_temp,text,moonset,moonrise,is_day}});
    }

    componentDidMount() {     
        this.getData();
        this.getWeather();
        this.getMoney();
        this.getTime();
    }

    componentWillUnmount() {
        clearInterval(intervalID);
    }

    
    
    render() {
        return (
            <>
            <div>
                <b>Economia</b><br></br>
                <b>Dolar: {(this.state.dolar).toLocaleString('pt-BR', formato)}</b><br></br>
                <b>Euro: {(this.state.euro).toLocaleString('pt-BR', formato)}</b><br></br>
                <b>Peso: {(this.state.peso).toLocaleString('pt-BR', formato)}</b><br></br>
                <b>Bitcoin: {(this.state.bitcoin).toLocaleString('pt-BR', formato)}</b><br></br>
                <b>Ibovespa: {this.state.ibovespa} pontos.</b><br></br><br></br>

                <b>Previsão do Tempo - Dia Atual</b><br></br>
                <b>Temp Atual {this.state.weatherCurrent.current_temp_c}°C</b><br></br>
                <b>Sensação {this.state.weatherCurrent.feels}°C</b><br></br>
                <b>Máx. {this.state.weatherCurrent.max_temp}°C</b><br></br>
                <b>Min. {this.state.weatherCurrent.min_temp}°C</b><br></br>
                <b>Condição {this.state.weatherCurrent.text}</b><br></br>                
                <b>Vento {this.state.weatherCurrent.wind} km/h</b><br></br>
                <b>Direção {this.state.weatherCurrent.dirwind}</b><br></br>    
                <b>Umidade {this.state.weatherCurrent.humidity}%</b><br></br>
                <b>Nascer do Sol {this.state.weatherCurrent.sunrise}</b><br></br>
                <b>Por do Sol {this.state.weatherCurrent.sunset}</b><br></br>
                <b>Nascer da Lua {this.state.weatherCurrent.moonrise}</b><br></br>
                <b>Por da Lua {this.state.weatherCurrent.moonset}</b><br></br>


                
                <b>Última atualização {this.state.weatherCurrent.date_refresh}</b><br></br>

                
                <br></br><b>Hora: {this.state.hora}</b>           <br></br> 
            </div>
            </>
        )
    }

}

