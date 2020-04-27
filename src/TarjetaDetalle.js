import React, { Component } from 'react';
// import './DetalleOrden.css';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { CircularProgressbar } from 'react-circular-progressbar';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InfoComplementaria from '../InfoComplementariaOrden/InfoComplementariaOrden';
import ListaMateriales from '../ListaMaterialesOrden/ListaMaterialesOrden';
import GraficoCircularGauge from '../Graficos/GraficoRendimiento/GraficoRendimientoTarjetaDetalle';
import GraficoRitmos from '../Graficos/GraficoRitmos/GraficoRitmosDetalle';
import GraficoParadas from '../Graficos/GraficoParadasAlertas/GraficoParadasAlertasDetalle';
import Styles from './TarjetaDetalleStyles';
import 'react-circular-progressbar/dist/styles.css';

class TarjetaDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const estado = this.props.datos ? this.props.datos.Estado : '';
    let color = '';
    switch (estado) {
      case 'PN':
        color = 'red';
        break;
      case 'EC':
        color = 'orange';
        break;
      case 'FN':
        color = 'green';
        break;
      default:
        color = 'red';
        break;
    }
   
    const classNameProgressBar = Styles[color];

    return (
      <div className="divTarjetaDetalle">
        <Card className="tarjetaDetalle">
          <Grid container classes={{ root: classes.tarjetaDetalle }}>
            <Grid
              item
              xl={12}
              md={12}
              xs={12}
              sm={12}
              classes={{ root: classes.gridContenedorInfoComplementaria }}
            >
              <CardContent style={{ width: '100%' }}>
                <Grid
                  item
                  xl={9}
                  md={9}
                  xs={9}
                  sm={9}
                  classes={{ root: classes.gridInfoComplementaria }}
                >
                  {/* Componente limpio */}
                  <InfoComplementaria
                    datos={this.props.datos}
                    ordenSeleccionada={this.props.ordenSeleccionada}
                    color={color}
                  />{' '}
                </Grid>
                <Grid
                  item
                  xl={3}
                  md={3}
                  xs={3}
                  sm={3}
                  classes={{ root: classes.gridProgressBar }}
                >
                  <CircularProgressbar
                    className="percentageModal"
                    value={this.props.ordenSeleccionada.progresoUnidades}
                    text={`${this.props.ordenSeleccionada.progresoUnidades}%`}
                    styles={classNameProgressBar}
                  />
                </Grid>
              </CardContent>
            </Grid>

            <Divider classes={{ root: classes.divisor }} />

            <Grid
              item
              xl={12}
              md={12}
              xs={12}
              sm={12}
              classes={{ root: classes.gridListaMateriales }}
            >
              <CardContent style={{ width: '100%' }}>
                {/* Componente limpio */}
                <ListaMateriales
                  datos={this.props.datos}
                  materiales={this.props.ordenSeleccionada.materiales}
                />
              </CardContent>
            </Grid>

            <Divider classes={{ root: classes.divisor }} />
            <Grid
              item
              xl={12}
              md={12}
              xs={12}
              sm={12}
              container
              classes={{ root: classes.gridContenedorCircularGauge }}
            >
              <CardContent style={{ width: '100%', display: 'block' }}>
                <Grid item xl={12} md={12} xs={12} sm={12}>
                  <GraficoRitmos
                    datosRitmos={this.props.datosRitmos}
                    className="linearGaugeDetalle"
                  />
                </Grid>
                <Grid item xl={12} md={12} xs={12} sm={12}>
                  <GraficoParadas
                    datosParadas={this.props.datosParadas}
                    className="GrafParadasDetalle"
                  ></GraficoParadas>
                </Grid>
              </CardContent>
            </Grid>

            <Grid
              item
              xl={12}
              md={12}
              xs={12}
              sm={12}
              container
              classes={{ root: classes.gridContenedorCircularGauge }}
            >
              <CardContent style={{ width: '100%' }}>
                {/* Componentes limpios */}

                <Grid
                  item
                  xs={3}
                  offset={1}
                  classes={{ root: classes.gridCircularGauge }}
                >
                  <GraficoCircularGauge
                    valorActual={this.props.datos.OEEActual}
                    titulo="OEE"
                    valorBase={this.props.datos.OEEBase}
                    valorObjetivo={this.props.datos.OEEObjetivo}
                  ></GraficoCircularGauge>
                </Grid>
                <Grid
                  item
                  xs={3}
                  offset={1}
                  classes={{ root: classes.gridCircularGauge }}
                >
                  <GraficoCircularGauge
                    valorActual={this.props.datos.DisponibilidadActual}
                    titulo="Disponibilidad"
                    valorBase={this.props.datos.DisponibilidadActualBase}
                    valorObjetivo={
                      this.props.datos.DisponibilidadActualObjetivo
                    }
                  ></GraficoCircularGauge>
                </Grid>
                <Grid
                  item
                  xs={3}
                  offset={1}
                  classes={{ root: classes.gridCircularGauge }}
                >
                  <GraficoCircularGauge
                    valorActual={this.props.datos.rendimientoActual}
                    titulo="Rendimiento"
                    valorBase={this.props.datos.rendimientoBase}
                    valorObjetivo={this.props.datos.rendimientoObjetivo}
                  ></GraficoCircularGauge>
                </Grid>
                <Grid
                  item
                  xs={3}
                  offset={1}
                  classes={{ root: classes.gridCircularGauge }}
                >
                  <GraficoCircularGauge
                    valorActual={this.props.datos.calidadActual}
                    titulo="Calidad"
                    valorBase={this.props.datos.calidadBase}
                    valorObjetivo={this.props.datos.calidadObjetivo}
                  ></GraficoCircularGauge>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

TarjetaDetalle.propTypes = {
  classes: PropTypes.object,
  datos: PropTypes.object,
  ordenSeleccionada: PropTypes.object,
};

export default withStyles(Styles)(TarjetaDetalle);
