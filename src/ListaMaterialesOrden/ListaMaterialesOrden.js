import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Styles from './ListaMaterialesOrdenStyles';

class ListaMaterialesOrden extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const material = this.props.materiales !== undefined ? this.props.materiales : [];
    return (
      <Grid item xs={12} classes={{ root: classes.containerTabla }}>
        <Grid>
          <h3 className={classes.h3Titulo}>Lista de materiales </h3>
        </Grid>
        <Grid classes={{ root: classes.contenedorTabla }}>
          <Table stickyHeader classes={{ root: classes.tabla }}>
            <TableHead>
              <TableRow>
                <TableCell width="5" classes={{ root: classes.cabecera }}>
                  Línea
                </TableCell>
                <TableCell width="5" classes={{ root: classes.cabecera }}>
                  Código
                </TableCell>
                <TableCell  classes={{ root: classes.cabecera }}>
                  Descripción Articulo
                </TableCell>
                <TableCell width="5" classes={{ root: classes.cabecera }}>
                  Cantidad
                </TableCell>
                <TableCell width="2" classes={{ root: classes.cabecera }}>
                  Unidad
                </TableCell>
                <TableCell width="5"classes={{ root: classes.cabecera }}>
                  Almacén
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {material.map(row => {
                return (
                  <TableRow key={row.Codigo + row.Almacen}>
                    <TableCell align="right">{row.linea}</TableCell>
                    <TableCell>{row.codigo}</TableCell>
                    <TableCell>{row.descripcion}</TableCell>
                    <TableCell align="right">{row.cantidad} </TableCell>
                    <TableCell>{row.unidad}</TableCell>
                    <TableCell>{row.almacenamiento}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}

ListaMaterialesOrden.propTypes = {
  classes: PropTypes.object,
  datos: PropTypes.object,
  materiales: PropTypes.array,
};

export default withStyles(Styles)(ListaMaterialesOrden);
