import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui/styles';
import $ from 'jquery';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

const styles = theme => ({
	usersHeader: {
		width: '80%',
		padding: '0 0 10px 10px',
		borderBottom: '1px solid black',
	},
   titleCell: {
      padding: '4px 40px 4px 24px',
   },
	deleteBtn: {
		width: '16px',
		height: '16px',
		cursor: 'pointer',
	},
});

class Income extends React.Component {
	state = {
		id: this.props.id,
		description: this.props.description,
		user: this.props.user,
		date: this.props.date,
		sum: this.props.sum,
		tax: this.props.tax,
		income: (this.props.income).toFixed(2),
	};

	deleteBtn() {
		let self = this;
		$.ajax({
			url: '/Income/RemoveIncome',
			data: { incomeId: self.state.id, },
			beforeSend: function (xhr) {
				let token = sessionStorage.getItem('accessToken');
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			success: function(data) {
				alert('Income was successfully deleted');
				self.props.updateListOfIncomes();
			},
			error: function(data) {
				alert('Something went wrong' + data);
			},
		});
	};

	render() {
		const { classes, } = this.props;

		return (
			<TableRow key={this.state.id}>
				<TableCell>{this.state.description}</TableCell>
				<TableCell>{this.state.user}</TableCell>
				<TableCell numeric>{this.state.date}</TableCell>
				<TableCell numeric>{this.state.sum}</TableCell>
				<TableCell numeric>{this.state.tax}</TableCell>
				<TableCell numeric>{this.state.income}</TableCell>
				<TableCell>
					<img src="Resources/icons/delete.png" className={classes.deleteBtn}
					 onClick={this.deleteBtn.bind(this)}/>
			 	</TableCell>
			</TableRow>
		);
	}
}

Income.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Income);
