import React, {Component} from 'react';
import styles from './search.css';
import AutoCompleteSearch from './auto-complete-search';

class Search extends Component {
	render () {
		return (
			<form id="demo-2">
				<AutoCompleteSearch type="search" id="demo-2"/>
			</form>
		)
	}	
}

export default Search;