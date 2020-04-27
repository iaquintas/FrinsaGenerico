import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  LinearGauge,
  Scale,
  Tick,
  Label,
  RangeContainer,
  Range,
  ValueIndicator,
  SubvalueIndicator,
  Size,
  Animation,
  Tooltip,
} from 'devextreme-react/linear-gauge';
import fVerde from '../../../img/flechaVerde.png';
import fAmarilla from '../../../img/flechaAmarilla.png';
import fAzul from '../../../img/flechaAzul.png';

const format = {
  type: 'decimal',
};

class GraficoRitmos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dibujarRangos = () => {
    const { datosRitmos } = this.props;
    const datosRitmo =
      Object.keys(datosRitmos).length > 0 && datosRitmos.barraRitmos !== null
        ? datosRitmos.barraDuracionActualOrden
        : [0, 0];
    return [
      <Range
        key={0}
        startValue={datosRitmo[0]}
        endValue={datosRitmo[1]}
        color={datosRitmos.colorBarra}
      />,
    ];
  };

  render() {
    const customPalette = ['#004F9F', '#008000', '#FFA500'];
    const { datosRitmos } = this.props;
    const valorInicial =
      Object.keys(datosRitmos).length > 0 && datosRitmos.barraRitmos !== null
        ? datosRitmos.barraRitmos[0]
        : 0;
    const valorFinal =
      Object.keys(datosRitmos).length > 0 && datosRitmos.barraRitmos !== null
        ? Math.round(datosRitmos.barraRitmos[1] / 10) * 10
        : 100;

    const puntoRitmoEstandar =
      Object.keys(datosRitmos).length > 0 && datosRitmos.barraRitmos !== null
        ? Math.round(datosRitmos.puntoRitmoEstandar)
        : 0;
    const puntoRitmoObjetivo =
      Object.keys(datosRitmos).length > 0 && datosRitmos.barraRitmos !== null
        ? Math.round(datosRitmos.puntoRitmoObjetivo)
        : 0;
    const puntoRitmoPrevisto =
      Object.keys(datosRitmos).length > 0 && datosRitmos.barraRitmos !== null
        ? Math.round(datosRitmos.puntoRitmoPrevisto)
        : 0;
    const escala =
      Object.keys(datosRitmos).length > 0 && datosRitmos.barraRitmos !== null
        ? Math.round(datosRitmos.barraRitmos[1] / 10)
        : 0;

    return (
      <div className="graficoRitmos">
        <div className="leyendaRitmos">
          <div className="leyendaPrincipal">
            <img src={fAzul} className="imgLeyenda" alt="imgLeyendaRoja"></img>{' '}
            <span className="textoLeyenda"> Estándar</span>
            <img
              src={fVerde}
              className="imgLeyenda"
              alt="imgLeyendaVerde"
            ></img>
            <span className="textoLeyenda"> Objetivo</span>
            <img
              src={fAmarilla}
              className="imgLeyenda"
              alt="imgLeyendaAmarilla"
            ></img>
            <span className="textoLeyenda"> Previsto</span>
          </div>
          <div className="unidadesPrincipal">
            <span>(Uds en minutos)</span>
          </div>
        </div>

        <LinearGauge
          id={
            this.props.className !== undefined
              ? this.props.className
              : 'linearGauge'
          }
          value={0}
          subvalues={[
            puntoRitmoEstandar,
            puntoRitmoObjetivo,
            puntoRitmoPrevisto,
          ]}
          redrawOnResize
        >
           <Animation enabled={false} />
          <Size height={60} />
          <Scale
            startValue={valorInicial}
            endValue={valorFinal}
            tickInterval={escala}
          >
            <Tick color="#536878" />
            <Label format={format} indentFromTick={-3} />
          </Scale>
          <RangeContainer offset={10} backgroundColor="#CBC5CF" width={15}>
            {this.dibujarRangos()}{' '}
          </RangeContainer>
          <ValueIndicator offset={20} />
          <SubvalueIndicator offset={-15} palette={customPalette} />
        </LinearGauge>
      </div>
    );
  }
}

GraficoRitmos.propTypes = {
  datosRitmos: PropTypes.object,
};

export default GraficoRitmos;
