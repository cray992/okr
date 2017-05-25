import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const styles = {
	objectiveText: {
		borderStyle: 'solid',
		borderWidth: 'thin',
		borderTopWidth: '3px',
		fontFamily: 'Roboto, sans-serif',
		borderColor: '#E0E0E0',
		borderRadius: '5px',
		padding: '3px',
		margin: '3px',
		minHeight: '30px'
	} 
}

const ObjectiveHierarchy = (props) => {
	return (
		<div> 
			<div style={styles.objectiveText}> Continue cloud momentum and formalize go forward strategy for different cloud platforms </div>
			<div> <FontIcon className="material-icons">expand_more</FontIcon> </div>
			<div style={styles.objectiveText}> Develop and implement Network Convergence strategy that leverages and builds upon strengths of both legacy CHC and MTS network capabilities. </div>
			<div> <FontIcon className="material-icons">expand_more</FontIcon> </div>
			<div style={styles.objectiveText}> Revenue recognition IT solution </div>
		</div>
	)
}

export default ObjectiveHierarchy;