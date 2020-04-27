import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GraficoParadasAlertas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  cargarDatos = () => {
    const rangos = [];
    if (Object.keys(this.props.datosParadas).length > 0) {
      const eventos = this.props.datosParadas.eventosParadas;

      let idEvento = 0;
      eventos.forEach(evento => {
        idEvento += 1;
        const duracionEventoPorcentaje =
          ((evento.duracion[1] - evento.duracion[0]) * 100) / 480;
        const comienzoEventoPorcentaje = (evento.duracion[0] * 100) / 480;

        rangos.push(
          <div
            className="value"
            style={{
              backgroundColor: evento.color,
              width: `${duracionEventoPorcentaje}%`,
              position: 'absolute',
              left: `${comienzoEventoPorcentaje}%`,
              height: '100%',
            }}
            key={idEvento}
          ></div>,
        );
      });
    }
    return rangos;
  };

  render() {
    const duracionActualOrdenPorcentaje =
      Object.keys(this.props.datosParadas).length > 0
        ? (this.props.datosParadas.eventoPadre.duracion[1] * 100) / 480
        : 0;

    return (
      <div className={this.props.className !== undefined ? this.props.className : 'divGrafParadas'}>
        <div className="divEscalaParadas">
          <span className="numeroEscala escalaInicio">0</span>
          <span className="numeroEscala escalaFin">480</span>
        </div>
        <div className="divRallasEscala">
          <span className="rallaEscala">|</span>
          <span className="rallaEscala">|</span>
        </div>
        <div className="multicolor-bar">
          <div
            style={{
              backgroundColor: 'green',
              width: `${duracionActualOrdenPorcentaje}%`,
              height: '100%',
            }}
          >
            {' '}
            <div className="values">{this.cargarDatos()}</div>
          </div>
        </div>
      </div>
    );
  }
}

GraficoParadasAlertas.propTypes = {
  datosParadas: PropTypes.object,
  datosRitmos: PropTypes.object,
};

export default GraficoParadasAlertas;
