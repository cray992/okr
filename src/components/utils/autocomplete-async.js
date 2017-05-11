import React from 'react';
import Select from 'react-select';

const AutoCompleteSync = React.createClass({
	displayName: 'Owner',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			backspaceRemoves: true,
			multi: false,
			minchar: 3
		};
	},
	onChange (value) {
		this.setState({
			value: value,
		});
	},
	getOptions (input) {
		if (!input || input.length < this.state.minchar) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`http://localhost:3001/employees/find/${input}`)
		.then((response) => response.json())
		.then((json) => {
			return { options: json };
		});
	},
	gotoOption (value, event) {
		window.open(value.name);
	},
	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
			<AsyncComponent 
				multi={this.state.multi} 
				value={this.state.value} 
				onChange={this.onChange} 
				onValueClick={this.gotoOption} 
				valueKey="_id" 
				labelKey="name" 
				loadOptions={this.getOptions} 
				backspaceRemoves={this.state.backspaceRemoves} />
		);
	}
});

module.exports = AutoCompleteSync;
