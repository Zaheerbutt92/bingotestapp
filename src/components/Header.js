import React from "react";
import { Typography, Grid} from '@material-ui/core';

function Header () {
    return (
        <Grid container justify="center" alignItems="center">
        <Typography variant='h3' gutterBottom>
          Bingo Test App
      </Typography>
      </Grid>

    )
}

export default Header;