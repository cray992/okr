import React, {Component} from 'react';
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
import * as actions from '../../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from '../search/search';
import AutoCompleteSearch from '../search/auto-complete-search';

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

const searchMuiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.darkBlack
  }
});

const styles = {
  toolbar: {
    backgroundColor: "#F3294D",
    color: Colors.grey50
  }
}

class Nav extends Component {  
  constructor(props) {
    super(props);
    this.openCheckin = this.openCheckin.bind(this); 
    this.state = {searchBoxOn: false};
    this.openSearch = this.openSearch.bind(this);
  }

  openSearch() {
    this.setState({searchBoxOn: true});
  }

  openCheckin() {
    this.props.actions.checkinClicked();
  }

  render () {
    const navToolbar = (
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup>
            {this.state.searchBoxOn ? (
            <MuiThemeProvider muiTheme={searchMuiTheme} >
              <AutoCompleteSearch />
            </MuiThemeProvider>
            ) : null}
            <IconButton tooltip="Dashboard" onTouchTap={this.openSearch}>
              <FontIcon className="material-icons">search</FontIcon>
            </IconButton>
            <ToolbarSeparator />
            <IconButton tooltip="Dashboard" href="/dashboard">
              <FontIcon className="material-icons">assessment</FontIcon>
            </IconButton>

            <IconButton tooltip="My Objectives" href="/my-objectives/5912036687a30c1a28d99142">
              <FontIcon className="material-icons">account_circle</FontIcon>
            </IconButton>

            <IconButton tooltip="Create new OKR" href="/objective/create">
              <FontIcon className="material-icons">add</FontIcon>
            </IconButton>

            <IconButton tooltip="Checkin" onTouchTap={this.openCheckin}>
              <FontIcon className="material-icons">filter_tilt_shift</FontIcon>
            </IconButton>

            <IconButton tooltip="Notifications">
              <FontIcon className="material-icons">message</FontIcon>
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

    return (
    	<div>
        <MuiThemeProvider muiTheme={muiTheme}>
      	  <AppBar
            title="OKR Management"
            href="/"
            showMenuIconButton={false}
            iconElementRight={navToolbar}
      	  />
      	</MuiThemeProvider>
        <CheckinHome />
      </div>
    )
  }
}

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
    { }
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (Nav);
