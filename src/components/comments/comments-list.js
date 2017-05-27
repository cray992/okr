import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';

const CommentsList = (props) => {
	const comments = props.list;
	console.log(comments);
	return (
    <ul className="chat">
		{
			comments ?
			comments.map( (item, i) => {
				const dt = new Date(item.datetime);
				const dtString = moment(dt).startOf('hour').fromNow();
				return (
					<li className="clearfix">
              <div className="chat-body clearfix">
                  <div className="header">
                      <strong className="primary-font">Ravi Botla</strong> <small className="pull-right text-muted">
                          <span className="glyphicon glyphicon-time"></span>{dtString}</small>
                  </div>
                  <p>
                  	{item.comment}
                  </p>
              </div>
					</li>
				)
			}
			)
			: <div> No messages found. </div>
		}
		</ul>
	)
}

export default CommentsList;