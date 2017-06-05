import React, {Component} from 'react';
import * as actions from '../../services/comments/comments-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import CommentsList from './comments-list';
import './_comments.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FontIcon from 'material-ui/FontIcon';
import { MentionsInput, Mention } from 'react-mentions';
import defaultStyle from './defaultStyle';
import defaultMentionStyle from './defaultMentionStyle';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import customAxios from '../../custom-axios';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#F3294D",
    accent1Color: "#F42A4D",
    pickerHeaderColor: "#8400D9",
    alternateTextColor: '#9BA1A9'
  },
}); 


class CommentsContainer extends Component {
	constructor(props) {
		super(props);
		props.actions.getCommentsForObjective(props.objective._id);

		this.state = {
			value: '',
			mentions: [],
			users: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.getUsers = this.getUsers.bind(this);
	}

	getUsers(searchTxt) {
		customAxios('employees/filter?name='+searchTxt)
    .then((response) => response.data)
    .then((json) => {
    	var users = json.map(user => ({ id: user._id, display: user.name }))
    	this.setState({
    		users: users
    	});
    });
	}

	handleSend() {
		if (this.state.value === '') return;

		// Process the mention info to remove (id) from the text
		const newVal = this.state.value.replace(/\((.*?)\)/g, '');

		const dataToServer = {
			mentions: this.state.mentions,
			value: newVal
		};
		// in the server:
		// we will check if there're mentions
		// then create notification for each one with "value"

		this.props.actions.saveNewComment(this.props.objective._id, '5912036687a30c1a28d99142', dataToServer);
  	this.setState({
  		value: ''
  	});
	}

	handleChange(event, newValue, newPlainTextValue, mentions) {
		//event.stopPropagation();
		this.setState({
			value: newValue,
			mentions: mentions
		});

		// if(newValue.length > 2) {
			var searchTxt = event.target.value.slice(1);
			this.getUsers(searchTxt);
		// }
	}

	render () {
		return (
			<Row>
				<Col md={12}>
				  <div className="panel">
			      <div className="panel-heading">
			          Messages
			      </div>

			      <div className="panel-body">
							<CommentsList list={this.props.objective_comments}/>
						</div>
					</div>

          <div className="panel-footer">
              <div>
									<MentionsInput
										value={this.state.value}
										onChange={this.handleChange}
						        placeholder={"Mention people using '@'"}
										markup="@[__display__](__id__)"
						        style={ defaultStyle({ multiLine: true }) }
										>
									    <Mention trigger="@"
								        data={ this.state.users }
							          style={ defaultMentionStyle }
							          appendSpaceOnAdd={true}
								        renderSuggestion={ (suggestion, search, highlightedDisplay) => {
								        	return (
								            <div className="user">
								              { highlightedDisplay }
								            </div>
							          	)
							          }}
									    />
									</MentionsInput>
									<MuiThemeProvider muiTheme={muiTheme}>
							    	<RaisedButton label="Send" style={{width: '100%'}} onTouchTap={this.handleSend}/>
							    </MuiThemeProvider>
              </div>
          </div>

				</Col>
			</Row>
	);
	}
}

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return ({
		objective_comments: state.comments.objective_comments,
		users: [{ id: '12', display: 'ravibotla'}, { id: '13', display: 'ravinash'}, { id: '14', display: 'ravendra'}]
  })
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (CommentsContainer);
