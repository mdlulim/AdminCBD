import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';

const useStyle = makeStyles((theme)=>({
  loaderContainer: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    background: 'rgb(255, 255, 255, .95)',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column',
    zIndex: 999
  },
  hide: {
    display: 'none'
  },
  message: {
    marginTop: theme.spacing(2)
  }
}));

function LoadingSpinner(props) {
  const classes = useStyle();
  return (
    <div className={clsx(classes.loaderContainer, {[classes.hide]:!props.loading})}>
      <Fade
          in={props.loading}
          unmountOnExit
        >
          <CircularProgress /> 
      </Fade>
      <Typography
        component="p" 
        className={classes.message} 
        variant="caption" 
        color={props.messageColor ? props.messageColor:'initial'}
      >
        {props.message ? props.message : 'Please wait...'}
      </Typography>
    </div>
  )
}

export default LoadingSpinner
