import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Styles from './InfoComplementariaOrdenStyles';

const Estado = props => {

  const { classes } = props;
  let color = '';
  const x = props.estado;
  let txt = '';
  switch (x) {
    case 'PN':
      color = 'red';
      txt = 'Pendiente';
      break;
    case 'EC':
      color = 'orange';
      txt = 'En curso';
      break;
    case 'FN':
      color = 'green';
      txt = 'Finalizado';
      break;
    default:
      color = 'red';
      txt = 'Por Defecto';
      break;
  }
  return (
    <span
      className={classes.elementoOrden}
      style={{ color /* ,paddingLeft:15 */ }}
    >
      {' '}
      {txt}
    </span>
  );
};

class InfoComplementariaOrden extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    let lotes = '';
    this.props.datos.Lotes.forEach((l, index) => {
      if (index > 0) lotes = `${lotes}, ${l}`;
      else lotes = l;
    });

    return (
      <Grid
        container
        spacing={0}
        classes={{ root: classes.gridContenedorInfoComplementaria }}
        key={this.props.ordenSeleccionada.orden}
      >
        <Grid item xs={12}>
          <h3 className={classes.h3Titulo}>Orden Planificación</h3>

          <h3 className={classes.h3Material}>
            {this.props.ordenSeleccionada.titulo}
          </h3>
          <Grid
            item
            x={12}
            container
            classes={{ root: classes.gridContenedorDatos1 }}
          >
            <Grid item xs={1} classes={{ root: classes.primeraColumna }}>
              Inicio
            </Grid>
            <Grid item xs={2} className="tituloCabecera">
              <span className={classes.elementoOrden}>
                {this.props.ordenSeleccionada.inicio}{' '}
                {this.props.datos.HoraInicio}
              </span>
            </Grid>
            <Grid item xs={1} classes={{ root: classes.segundaColumna }}>
              Fabricados{' '}
            </Grid>
            <Grid item xs={1} classes={{ root: classes.datosSegundaColumna }}>
              <span className={classes.elementoOrden}>
                {' '}
                {this.props.ordenSeleccionada.unidadesFabricadas}
              </span>
            </Grid>
            <Grid item xs={1} classes={{ root: classes.terceraColumna }}>
              Lote Nº
            </Grid>
            <Grid item xs={3} className="tituloCabecera">
              <span className={classes.elementoOrden}>
                {this.props.ordenSeleccionada.numeroLote}
              </span>
            </Grid>
          </Grid>
          <Grid
            item
            x={12}
            container
            classes={{ root: classes.gridContenedorDatos2 }}
          >
            <Grid item xs={1} classes={{ root: classes.primeraColumna }}>
              Orden Nº
            </Grid>
            <Grid item xs={2} className="tituloCabecera">
              <span className={classes.elementoOrden}>
                {' '}
                {this.props.ordenSeleccionada.orden}
              </span>
            </Grid>
            <Grid item xs={1} classes={{ root: classes.segundaColumna }}>
              Planificado
            </Grid>
            <Grid item xs={1} classes={{ root: classes.datosSegundaColumna }}>
              <span className={classes.elementoOrden}>
                {' '}
                {this.props.ordenSeleccionada.unidadesPlanificadas}
              </span>
            </Grid>
            <Grid item xs={1} classes={{ root: classes.terceraColumna }}>
              Estado
            </Grid>
            <Grid item xs={3} className="tituloCabecera">
              {Estado(this.props)}
            </Grid>
          </Grid>
          <Grid
            item
            x={12}
            container
            classes={{ root: classes.gridContenedorDatos3 }}
          >
            <Grid item xs={1} classes={{ root: classes.primeraColumna }}>
              Línea
            </Grid>
            <Grid item xs={5} className="tituloCabecera">
              <span className={classes.elementoOrden}>
                {' '}
                {this.props.ordenSeleccionada.linea}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

InfoComplementariaOrden.propTypes = {
  classes: PropTypes.object,
  datos: PropTypes.object,
  estado: PropTypes.string,
  ordenSeleccionada: PropTypes.object,
};

export default withStyles(Styles)(InfoComplementariaOrden);
