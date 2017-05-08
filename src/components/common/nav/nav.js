import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.white,
    primary1Color: "#010144",
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.white
  },
  appBar: {
    height: 60,
  },
});

const Nav = () => (
	<MuiThemeProvider muiTheme={muiTheme}>
	  <AppBar
	    title="OKR Management"
	    iconClassNameRight="muidocs-icon-navigation-expand-more"
	  />
	</MuiThemeProvider>
);

export default Nav;



