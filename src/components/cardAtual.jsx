import React from "react";


export default function CardAtual(props) {


  return (
    <div className="col-sm d-flex">
      <div className="w-100 align-self-center text-center">
        <h3>
          <span className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
            Canto Grande - Bombinhas
          </span>
        </h3>
        <h3>
          <span className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
            Hoje - {props.weatherCurrent.data}
          </span>
        </h3>
        <div>
          <div className="row justify-content-center">
            <div className="col-0">
              <img src={props.weatherCurrent.icon} alt="."  />
            </div>
            <div className="col-0 text-left align-self-center">
              <h3>
                <span className="btn btn-outline-dark" style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                  {props.weatherCurrent.current_temp_c}°C - {props.weatherCurrent.text}
                </span>
              </h3>
              <h3>
                <span className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  {props.weatherCurrent.dirwind} - {props.weatherCurrent.wind} km/h
                </span>
              </h3>
            </div>
          </div>
        </div>
        <h3>
          <span className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
            Sensação {props.weatherCurrent.feels}°C
          </span>
        </h3>      
        <p className="card-text">
          <small className="text-muted" style={{ fontWeight: "bold" }}>
            Última Atualização {props.weatherCurrent.data}
          </small>
          <br></br>
          <small className="text-muted" style={{ fontWeight: "bold" }}>
            Nº Atualizações {props.weatherCurrent.atualiza}
          </small>
        </p>
      </div>
    </div>
  );
}
