import React from "react";

export default function CardForecast(props) {
    return (
        <div className='card mb-3 col-md' style={{maxWidth: '540px'}}>
            <div className='row no-gutters'>
                <div className='col-md-4'>
                    <img src={props.weatherOne.icone} className='card-img' alt='...' />
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                        <h5 className='card-title' style={{fontWeight: 'bold'}}>{props.weatherOne.data}</h5>
                        <p className='card-text' style={{fontWeight: 'bold'}}>
                            <label>Máx: {props.weatherOne.max} ºC</label><br/>
                            <label>Mín: {props.weatherOne.min} ºC</label>
                            <br />
                            <label>{props.weatherOne.text}</label><br/>
                            <label>Nascer do Sol: {props.weatherOne.sunrise}</label><br />
                            <label>Pôr do Sol: {props.weatherOne.sunset}</label>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
