import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductsData } from '../../store/actions/productsActions';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    marginTop: 100,
    backgroundColor: theme.palette.background.paper
  },
  loadingIndiactor: {
    textAlign: 'center'
  },
  productImage: {
    paddingRight: 10,
    width: 150
  },
  customGridWidth: {
    [theme.breakpoints.up('lg')]: {
      width: 900
    }
  },
  inline: {
    display: 'inline'
  }
});

class ProductsList extends Component {
  componentDidMount() {
    this.props.getProductsData();
  }
  render() {
    const { classes, products } = this.props;
    console.log(products);
    if (!products.length) {
      return <h1 className={classes.loadingIndiactor}>Loading...</h1>;
    } else
      return (
        <Fragment>
          <Grid
            className={classes.customGridWidth}
            container
            direction='row'
            justify='center'
            spacing={10}
            style={{
              margin: 'auto',
              width: '60%'
            }}
          >
            <List className={classes.root}>
              {products.map(product => (
                <ListItem alignItems='flex-start' button key={product.id}>
                  <ListItemAvatar>
                    <img
                      src={product.assets.uri}
                      alt='product'
                      className={classes.productImage}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.elements[1].value}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component='span'
                          variant='body2'
                          className={classes.inline}
                          color='textPrimary'
                        >
                          Price: {product.elements[3].value.value}{' '}
                          {product.elements[3].value.unitAbbreviation}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Fragment>
      );
  }
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  getProductsData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products.products
});

export default connect(
  mapStateToProps,
  { getProductsData }
)(withStyles(styles)(ProductsList));
