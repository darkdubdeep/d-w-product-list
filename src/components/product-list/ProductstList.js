import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
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
}));
const ProductsList = () => {
  const classes = useStyles();

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
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Grid>
    </Fragment>
  );
};

export default ProductsList;
