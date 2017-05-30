import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import moment from 'moment';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: Colors.Grey,
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.darkBlack
  }
});

const NotificationsDialog = (props) => {
	const {notifications} = props;
	return (
		<MuiThemeProvider muiTheme={muiTheme}>
				<div>
		    <List>
			  	{
			  		(notifications ? 
			  			(
								notifications.map ( (item, key) => {
									const dt = new Date(item.datetime);
									const dtString = moment(dt).startOf('minute').fromNow();

									return (
										<div>
								        <ListItem
								          primaryText={dtString + " - " + item.notification }
								          href={item.actionurl}
								          key={key}
								        />
								        <Divider inset={false} />
								    </div>
									)
								})
							): (
								<div> No objectives found! </div> 
							)
						)
			  	}
		    </List>
			</div>
		</MuiThemeProvider>
	)
}

export default NotificationsDialog;