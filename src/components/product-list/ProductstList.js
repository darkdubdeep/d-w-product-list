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
    marginTop: 150,
    backgroundColor: theme.palette.background.paper
  },
  productImage: {
    paddingRight: 10,
    width: 200
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
    return (
      <Fragment>
        <p>{products}</p>
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
            <ListItem alignItems='flex-start' button>
              <ListItemAvatar>
                <img
                  src='https://im0-tub-ru.yandex.net/i?id=630eb42034cc348f04b6471b6c9d38f1&n=13'
                  alt='product'
                  className={classes.productImage}
                />
              </ListItemAvatar>
              <ListItemText
                primary='Watch name'
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      className={classes.inline}
                      color='textPrimary'
                    >
                      Price:
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
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
