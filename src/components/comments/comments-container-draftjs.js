import React, {Component} from 'react';
import * as actions from '../../services/comments/comments-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import CommentsList from './comments-list';
import './_comments.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FontIcon from 'material-ui/FontIcon';
import DraftJSMentionEditor from '../utils/draft-js-mention-editor';

class CommentsContainer extends Component {
	constructor(props) {
		super(props);
		props.actions.getCommentsForObjective(props.objective._id);

		this.state = {
			value: '',
			mentions: [],
			users: []
		}
		this.handleSend = this.handleSend.bind(this);
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
              	<DraftJSMentionEditor/>
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

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return ({
		objective_comments: state.comments.objective_comments
  })
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (CommentsContainer);
