import React, {Component} from 'react';

const style = {

}

class CommentsContainer extends Component {
	render () {
		return (
			<div className="comments-container">
				<button>Load more</button>
				<ul className="comments-list">
  				<li></li>
				</ul>
				<form className="comments-form">
					<input/>
					<button>Save</button>
				</form>
			</div>
		);
	}
	
}

export default CommentsContainer;

// CommentsContainer
// 	Comments list
// 		Comment item
// 	Toolbar
// 		Comment Entry
// 		Button