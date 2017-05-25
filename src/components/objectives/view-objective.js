import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import * as actions from '../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import PageHeader from './page-header';
import KeyResultsList from './key-results-list';

const currentObjective = {
	name: 'Revenue recognition',
	keyresults: [
		{name: 'RMS solution by end of September 2017'},
		{name: 'Design CLM to upload contracts by end of July 2017'},
		{name: 'Design Revenue datamart by end of Aug 2017'}		
	]
};

const style = {
	objview: {
		height: '30px'
	} 
}

class ViewObjective extends Component {
	constructor (props) {
		super(props);
		props.actions.getObjectiveDetails(props.params.id);
	}

	render () {
		const objective = this.props.currentObjective;
		console.log(objective);

		return (
			<div>
			{
				objective ? 
					<div>
						<PageHeader 
							title={"Objective: " + this.props.currentObjective.name}
						/>
						<Grid fluid>
							<Row>
								<Col md={1}></Col>
								<Col md={8}>
									<Row>
										<Col md={12}>
											<ObjectiveDetailsView objective={objective}/>
										</Col>
									</Row>
									<Row>
										<Col md={12}>
											<KeyResultsList keyresults={objective.keyresults}/>
										</Col>
									<Col md={3}></Col>
									</Row>
								</Col>
							</Row>
						</Grid>
					</div>
				: null
			}
			</div>
		)
	}
}

const ObjectiveDetailsView = (props) => (
	<div>
		<br/>
		<Row style={style.objview}>
			<Col md={2}><b>Owner:</b></Col>
			<Col md={10}>{props.objective.owner.name}</Col>
		</Row>
		<Row style={style.objview}>
			<Col md={2}><b>Description:</b></Col>
			<Col md={10}>{props.objective.description}</Col>
		</Row>
		<Row style={style.objview}>
			<Col md={2}><b>Category:</b></Col>
			<Col md={10}>{props.objective.category}</Col>
		</Row>
		<Row style={style.objview}>
			<Col md={2}><b>Contingency:</b></Col>
			<Col md={10}>{props.objective.contingency}</Col>
		</Row>
		<Row style={style.objview}>
			<Col md={2}><b>Tags:</b></Col>
			<Col md={10}>{props.objective.tags.map(x => x.name).join(', ')}</Col>
		</Row>
	</div>
)

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
    { 
      currentObjective: state.objectives.currentObjective
     }
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (ViewObjective);
