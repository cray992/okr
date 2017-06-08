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
import * as nActions from '../../../services/notifications/notifications-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from '../search/search';
import AutoCompleteSearch from '../search/auto-complete-search';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import NotificationsDialog from '../../notifications/notifications-dialog';

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
  },
  notifications: {

  }
}

class Nav extends Component {  
  constructor(props) {
    super(props);
    this.openCheckin = this.openCheckin.bind(this); 
    this.state = {searchBoxOn: false, notificationOpen: false};
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleOnNotificationOpen = this.handleOnNotificationOpen.bind(this);
    this.handleNotificationClose = this.handleNotificationClose.bind(this);
    props.notificationActions.getMyNotifications(props.current_emp_id);
  }

  // componentWillUpdate(props) {
  //   props.notificationActions.getMyNotifications('5912036687a30c1a28d99142'); 
  // }

  handleOnNotificationOpen(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      notificationOpen: true,
      anchorEl: event.currentTarget
    });
  };

  handleNotificationClose () {
    this.setState({
      notificationOpen: false,
    });
  };

  toggleSearch() {
    this.setState({searchBoxOn: !this.state.searchBoxOn});
  }

  openCheckin() {
    this.props.actions.checkinClicked();
  }

  render () {
    const notificationCount =  this.props.my_notifications ? this.props.my_notifications.length : 0;

    const navToolbar = (
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup>
            {this.state.searchBoxOn ? (
            <MuiThemeProvider muiTheme={searchMuiTheme} >
              <AutoCompleteSearch />
            </MuiThemeProvider>
            ) : null}
            <IconButton tooltip="Dashboard" onTouchTap={this.toggleSearch}>
              <FontIcon className="material-icons">search</FontIcon>
            </IconButton>
            <ToolbarSeparator />
            <IconButton tooltip="Dashboard" href="/dashboard">
              <FontIcon className="material-icons">assessment</FontIcon>
            </IconButton>

            <IconButton tooltip="My Objectives" href="/my-objectives">
              <FontIcon className="material-icons">account_circle</FontIcon>
            </IconButton>

            <IconButton tooltip="Create new OKR" href="/objective/create">
              <FontIcon className="material-icons">add</FontIcon>
            </IconButton>

            <IconButton tooltip="Checkin" onTouchTap={this.openCheckin}>
              <FontIcon className="material-icons">filter_tilt_shift</FontIcon>
            </IconButton>

            <IconButton tooltip="Notifications" onTouchTap={this.handleOnNotificationOpen}>
              <NotificationsIcon />
              <Badge
                badgeContent={notificationCount || 0}
                badgeStyle={{top: -35, right: -1, width: 18, borderStyle: 'none', height: 18, color: '#F3294D', borderStyle: 'solid'}}
              >
              </Badge>
            </IconButton>
            <Popover
              open={this.state.notificationOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleNotificationClose}
              animation={PopoverAnimationVertical}  
              style={{width: '400px', height: '400px', overflowY: 'auto', fontSize: 'small'}}
            >
              <NotificationsDialog notifications={this.props.my_notifications} />
            </Popover>
            <ToolbarSeparator />
            <IconButton tooltip="Logout" href="/login">
              <FontIcon className="material-icons">power_settings_new</FontIcon>
            </IconButton>

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
    { 
      my_notifications: state.notifications.my_notifications,
      current_emp_id: state.employees.current_emp_id,
    }
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  notificationActions: bindActionCreators(nActions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (Nav);
