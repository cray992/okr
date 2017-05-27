import React, {Component} from 'react';
import * as actions from '../../services/comments/comments-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Field, reduxForm } from 'redux-form';
import CommentsList from './comments-list';
import './_comments.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FontIcon from 'material-ui/FontIcon';
import { MentionsInput, Mention } from 'react-mentions';

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
		this.renderUserSuggestion = this.renderUserSuggestion.bind(this);
		this.renderTagSuggestion = this.renderTagSuggestion.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.getUsers = this.getUsers.bind(this);
	}

	getUsers(searchTxt) {
		return fetch('http://localhost:3001/api/employees/filter?name='+searchTxt)
    .then((response) => response.json())
    .then((json) => {
    	var users = json.map(user => ({ id: user._id, display: user.name }))
    	this.setState({
    		users: users
    	});
    });
	}

	handleSend() {
		var dataToServer = {
			mentions: this.state.mentions,
			value: this.state.value
		};

		// in the server:
		// we will check if there're mentions
		// then create notification for each one with "value"

		console.log(dataToServer);
	}

	handleChange(event, newValue, newPlainTextValue, mentions) {
		//e.stopPropagation();
		//this.state.value += e.target.value;
		console.log(event.target.value, newValue, newPlainTextValue, mentions);

		this.setState({
			value: event.target.value,
			mentions: mentions
		});

		if(newValue.length > 2) {
			var searchTxt = newValue.slice(1);
			this.getUsers(searchTxt)
		}
	}

	renderUserSuggestion() {
		console.log('renderUserSuggestion called');
		return this.props.users;
	}

	renderTagSuggestion() {
		console.log('renderTagSuggestion called');
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
              <div className="input-group">
									<MentionsInput
										value={this.state.value}
										onChange={this.handleChange}
										markup="@[__display__](__id__)"
										>
									    <Mention trigger="@"
									        data={this.state.users}
									        renderSuggestion={ (suggestion, search, highlightedDisplay) => (
								            <div className="user">
								              { highlightedDisplay }
								            </div>
								          )}
									       />
									</MentionsInput>
                  <span className="input-group-btn">
                      <button onClick={this.handleSend} className="btn btn-warning btn-sm" id="btn-chat">Send</button>
                  </span>
              </div>
          </div>

				</Col>
			</Row>
	);
	}
}

// Decorate the form component
CommentsContainer = reduxForm({
  form: 'comment'
})(CommentsContainer);

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
