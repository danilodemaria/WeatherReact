import React from "react";

export default function CardForecast(props) {
  return (
    <div className="card col-md">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={props.weatherOne.icone} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: "bold" }}>
              {props.weatherOne.data}
            </h5>
            <p className="card-text" style={{ fontWeight: "bold" }}>
              <label className= "textForecast" >Máx: {props.weatherOne.max} ºC</label>
              <br />
              <label className= "textForecast">Mín: {props.weatherOne.min} ºC</label>
              <br />
              <label className= "textForecast">Nascer do Sol: {props.weatherOne.sunrise}</label>
              <br />
              <label className= "textForecast" >Pôr do Sol: {props.weatherOne.sunset}</label>
              <br />
              <label className= "textForecast">{props.weatherOne.text}</label>          
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
