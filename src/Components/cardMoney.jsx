import React from "react";

const CardMoney = props => {
  return (
    <div class="card bg-ligth col-md-5" style={{ width: "18rem", border: "none",marginRight:'150px' }}>
      <img src="./logo.png" class="card-img-top" alt="..." />
      <div class="card-body">
        <p class="card-text">
          <div class="text-center">
            <h1>
              <span style={{ fontSize: "100px", padding: "0 10px 0 10px !important" }}>{props.geral.hora}</span>
            </h1>
          </div>
          <div class="text-center">
            <div>
              <h4>
                <span class="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  Dolar: R$ {props.geral.dolar}
                </span>
              </h4>
              <h4>
                <span class="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  Peso: R$ {props.geral.peso}
                </span>
              </h4>
            </div>
            <div>
              <h4>
                <span class="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  Euro R$ {props.geral.euro}
                </span>
              </h4>
              <h4>
                <span class="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  Bitcoin: R$ {props.geral.bitcoin}
                </span>
              </h4>
            </div>
            <div>
              <h4>
                <span class="btn btn-outline-dark" style={{ fontWeight: "bold" }}>
                  Ibovespa {props.geral.ibovespa} pontos
                </span>
              </h4>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default CardMoney;
