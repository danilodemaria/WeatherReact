import React from "react";

const CardMoney = props => {
  return (

    <div className="card bg-ligth col-md-5" style={{ width: "18rem", border: "none",marginRight:'50px' }}>
      <img src="./logo.png" className="card-img-top" alt="..." />
      <div className="card-body">
        <div className="card-text">
          <div className="text-center">
            <h1>
              <span className="relogioHoras">{props.geral.hora}</span>
            </h1>
          </div>
          <div className="text-center">
            <div>
              <h4>
                <span className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  Dolar: {props.geral.dolar}
                </span>
              </h4>
              <h4>
                <span className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  Peso: {props.geral.peso}
                </span>
              </h4>
            </div>
            <div>
              <h4>
                <span className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  Euro {props.geral.euro}
                </span>
              </h4>
              <h4>
                <span className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  Bitcoin: {props.geral.bitcoin}
                </span>
              </h4>
            </div>
            <div>
              <h4>
                <span className="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  Ibovespa {props.geral.ibovespa} pontos
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMoney;
