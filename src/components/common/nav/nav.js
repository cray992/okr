import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import CheckinHome from '../../objectives/checkin-home';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.white,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.white
  },
  appBar: {
    height: 60,
  }
});

const styles = {
  toolbar: {
    backgroundColor: "#F3294D",
    color: Colors.grey50
  }
}

const navToolbar = (
    <Toolbar style={styles.toolbar}>
      <ToolbarGroup>
        <ToolbarSeparator />
        <IconButton tooltip="My Objectives" href="/my-objectives">
          <FontIcon className="material-icons">account_circle</FontIcon>
        </IconButton>

        <IconButton tooltip="Create new OKR" href="/objectives/create">
          <FontIcon className="material-icons">add</FontIcon>
        </IconButton>

        <IconButton tooltip="Checkin">
          <FontIcon className="material-icons">location_on</FontIcon>
        </IconButton>

        <IconButton tooltip="Discuss">
          <FontIcon className="material-icons">forum</FontIcon>
        </IconButton>

        <ToolbarSeparator />
        
        <IconMenu
          iconButtonElement={
            <IconButton touch={true}>
              <NavigationExpandMoreIcon />
            </IconButton>
          }
        >
          <MenuItem primaryText="Logout" />
          <MenuItem primaryText="More Info" />
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>
  );

const Nav = () => (
	<div>
    <MuiThemeProvider muiTheme={muiTheme}>
  	  <AppBar
        title="OKR Management"
        href="/"
        showMenuIconButton={false}
        iconElementRight={navToolbar}
  	  />
  	</MuiThemeProvider>
  </div>
);

export default Nav;