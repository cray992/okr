import React, {Component} from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';


class KeyResultsList extends Component {
	render() {
		const keyResults = [
			{keyResult: "CLM re-design for revenue recognition", owner: "Dean Q", completeBy:"5/31/2017", status:"In Progress", unit:"percentage", target:"100", current:"30"},
			{keyResult: "Build revenue datamart", owner: "Holt Z", completeBy:"7/15/2017", status:"In Progress", unit:"percentage", target:"100", current:"30"},
			{keyResult: "RMS system build vs buy decision", owner: "John Guillebeaux", completeBy:"5/31/2017", status:"Not Started", unit:"done", target:"100", current:"0"},
			{keyResult: "Build RMS reporting system", owner: "Dean Quach", completeBy:"8/15/2017", status:"Not Started", unit:"percentage", target:"100", current:"30"},
			{keyResult: "CRM data cleanup", owner: "Dean Quach", completeBy:"5/31/2017", status:"In Progress", unit:"percentage", target:"100", current:"30"},
			{keyResult: "Develop product crosswalk", owner: "Dean Quach", completeBy:"7/10/2017", status:"In Progress", unit:"percentage", target:"100", current:"30"},
			{keyResult: "Develop customer crosswalk", owner: "Dean Quach", completeBy:"7/10/2017", status:"In Progress", unit:"percentage", target:"100", current:"30"},
		];

		//const keyResults  = this.props.keyResults || defaultKeyResults; 

		return(
      <List>
		  	{
  				keyResults.map ( (item, key) => {
  					return (
							<KeyResultItem key={key} keyResults={item} />
  					)
  				})
		  	}
      </List>
    );
	}
}

const KeyResultItem = (props) => {
	return (
		<div>
        <ListItem
          primaryText={props.keyResults.keyResult}
		      leftAvatar={
		        <Avatar src="person-avatar.png" />
		      }
        />
        <Divider inset={false} />
    </div>
	);
}

export default KeyResultsList;
