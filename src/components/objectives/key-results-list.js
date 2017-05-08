import React, {Component} from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const KeyResultsList = (props) => {
  const keyresults = props.keyresults;
	return(
    <List>
	  	{
				keyresults.map ( (item, key) => {
					return (
						<KeyResultItem key={key} keyResult={item} />
					)
				})
	  	}
    </List>
  )
}

const KeyResultItem = (props) => {
	return (
		<div>
        <ListItem
          primaryText={props.keyResult}
		      leftAvatar={
		        <Avatar src="person-avatar.png" />
		      }
        />
        <Divider inset={false} />
    </div>
	);
}

export default KeyResultsList;
