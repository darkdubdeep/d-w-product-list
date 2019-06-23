import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getProductDetail,
  clearProductDetail
} from '../../store/actions/productsActions';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    maxWidth: 500,
    marginTop: 50
  },
  media: {
    height: 350
  },
  loadingIndiactor: {
    textAlign: 'center'
  }
});

class ProductDetail extends Component {
  componentDidMount() {
    this.props.getProductDetail(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearProductDetail();
  }

  openProductList = () => {
    this.props.history.push(`/`);
  };

  render() {
    const product = this.props.product;
    console.log(product);
    const { classes } = this.props;
    if (!product.assets) {
      return <h1 className={classes.loadingIndiactor}>Loading...</h1>;
    } else
      return (
        <Grid
          container
          direction='row'
          justify='center'
          spacing={10}
          style={{
            margin: 'auto',
            width: '60%'
          }}
        >
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={product.assets.uri}
              title='Contemplative Reptile'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {product.elements[1].value}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                Serial: {product.elements[0].value}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                Color: {product.elements[5].value}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                Size: {product.elements[6].value}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {product.elements[2].value}
              </Typography>
              <Typography variant='body2' component='p'>
                Price: {product.elements[3].value.value}{' '}
                {product.elements[3].value.unitAbbreviation}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='small'
                color='primary'
                onClick={this.openProductList}
              >
                Back
              </Button>
              <Button size='small' color='primary'>
                Buy
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
  }
}

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired,
  getProductDetail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.products.product
});

export default connect(
  mapStateToProps,
  { getProductDetail, clearProductDetail }
)(withStyles(styles)(ProductDetail));
