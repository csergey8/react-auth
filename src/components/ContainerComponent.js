import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 30,
    textAlign: 'center'
  },
}));

const ContainerComponent = props => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        {props.children}
      </Paper> 
    </Container>
  );
};

export default ContainerComponent;