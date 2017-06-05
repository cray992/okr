import {getMyNotifications} from '../notifications/notifications-actions';
import customAxios from '../../custom-axios';

export function getCommentsForObjectiveCompleted (data) {
	return  {
		type: "GET_COMMENTS_FOR_OBJECTIVE",
		payload: data
	}
}

export function saveNewCommentCompleted (data) {
	return  {
		type: "SAVE_NEW_COMMENT_COMPLETED",
		payload: data
	}
}

export function getCommentsForObjective (data) {
	return (dispatch) => {
		return customAxios('comments?refid='+data, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getCommentsForObjectiveCompleted(data)))
	}
}

export function saveNewComment(objectiveId, commentedby, data ) {
	return (dispatch) => {
		return customAxios('comments', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      	refid: objectiveId,
      	type: "Objective",
      	persons: data.mentions.map( x => x.id ),
      	comment: data.value,
      	commentedby: commentedby
      })
		})
		.then((res) => res.data)
		.then((newData) => dispatch(saveNewCommentCompleted(newData)))
		.then((x) => getMyNotifications('5912036687a30c1a28d99142'))
	}
}
