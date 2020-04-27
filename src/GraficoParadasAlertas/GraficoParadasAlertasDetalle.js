import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'devextreme-react/tooltip';

class GraficoParadasAlertas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipParada: false,
      tooltipEvento: false,
      visibletooltipParada: false,
      visibletooltipEvento: false,
    };
  }

  componentDidMount() {
    const paradas = this.props.datosParadas.eventosParadas;
    let idEvento = 0;
    const eventos = [];
    paradas.forEach(parada => {
      idEvento += 1;

      eventos.push({ idEvento, enable: false });
      this.setState({ eventos });
    });
  }

  toggleDefault = elemento => {
    this.setState({
      tooltipParada: !this.state.tooltipParada,
    });
  };

  toggleDefaultEventoShow = (index, event) => {

    const { eventos } = this.state;

    eventos.forEach(evento => {
      if (evento.idEvento === index + 1) {
        evento.enable = true;
      }
    });

    this.setState({
      eventos,
    });
    event.stopPropagation();
  };

  toggleDefaultEventoHidden = (index, event) => {

    const { eventos } = this.state;

    eventos.forEach(evento => {
      if (evento.idEvento === index + 1) {
        evento.enable = false;
      }
    });

    this.setState({
      eventos,
    });
    event.stopPropagation();
  };

  cargarDatos = () => {
    const rangos = [];
    if (Object.keys(this.props.datosParadas).length > 0) {
      const eventos = this.props.datosParadas.eventosParadas;

      let idEvento = 0;
      eventos.forEach((evento, index) => {
        idEvento += 1;
        const duracionEventoPorcentaje =
          ((evento.duracion[1] - evento.duracion[0]) * 100) / 480;
        const comienzoEventoPorcentaje = (evento.duracion[0] * 100) / 480;

        rangos.push(
          <div
            id={`tooltipEvento${idEvento}`}
            className="value"
            style={{
              backgroundColor: evento.color,
              width: `${duracionEventoPorcentaje}%`,
              position: 'absolute',
              left: `${comienzoEventoPorcentaje}%`,
              height: '100%',
            }}
            key={idEvento}
            onMouseEnter={event => this.toggleDefaultEventoShow(index, event)}
            onMouseLeave={event => this.toggleDefaultEventoHidden(index, event)}
          >
            <Tooltip
              target={`#tooltipEvento${idEvento}`}
              visible={
                this.state.eventos !== undefined
                  ? this.state.eventos[idEvento - 1].enable
                  : false
              }
            >
              <div>
                <span>Descripción: {evento.nombreCategoria} </span>
                <br />
                <span>Duración: {evento.duracionMinutosYSegundos} </span>
                <br />
                <span>Fecha de inicio: {evento.fechaInicio} </span>
                <br />
                <span>Fecha de fin: {evento.fechaFin} </span>
                <br />
              </div>
            </Tooltip>
          </div>,
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
      <div
        className={
          this.props.className !== undefined
            ? this.props.className
            : 'divGrafParadas'
        }
      >
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
            id="duracionActual"
            style={{
              backgroundColor: 'green',
              width: `${duracionActualOrdenPorcentaje}%`,
              height: '100%',
            }}
            onClick={() => this.toggleDefault('tooltipParada')}
          >
            {' '}
            <div className="values">{this.cargarDatos()}</div>
          </div>
          <Tooltip target="#duracionActual" visible={this.state.tooltipParada}>
            <div>
              {`Duración actual: ${Math.round(
                this.props.datosParadas.eventoPadre.duracion[1],
              )}`}
            </div>
          </Tooltip>
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
