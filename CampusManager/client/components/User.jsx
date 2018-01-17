import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui/styles';
import $ from 'jquery';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';

const styles = theme => ({
	usersHeader: {
		width: '80%',
		padding: '0 0 10px 10px',
		borderBottom: '1px solid black',
	},
	usersLogo: {
		fontFamily: 'Helvetica',
		fontSize: '16px',
	},
	addBtn: {
		display: 'inline-block',
		width: '60%',
		position: 'absolute',
		textAlign: 'right',
	},
	idForm: {
		margin: '5px 20px',
		width: '67%',
	},
	formControl: {
		margin: '5px 20px',
		width: '35%',
  	},
	container: {
		margin: '15px',
		width: '600px',
		flexDirection: 'column',
		background: '#fafafa',
		boxShadow: '4px 5px 20px -7px rgba(0, 0, 0, .75)',
		borderRadius: '3px',
		boxSizing: 'border-box',
	},
	button: {
		alignSelf: 'flex-end',
		margin: '10px 5px 10px 0',
	},
	buttonsWrapper: {
		alignSelf: 'flex-end',
	},
	disabled: {
		color: 'black',
	},
	disabledLabel: {
		color: 'grey',
	}
});

class User extends React.Component {
	state = {
		id: this.props.id,
		firstName: this.props.firstName,
		lastName: this.props.lastName,
		password: this.props.password,
		email: this.props.email,
		role: this.props.role,
		saveOff: true,
	};

	firstNameChange(event) {
		this.setState({ firstName: event.target.value, });
	};

	lastNameChange(event) {
		this.setState({ lastName: event.target.value, });
	};

	emailChange(event) {
		this.setState({ email: event.target.value, });
	};

	editBtn() {
		this.setState({ saveOff: !this.state.saveOff, });
		if (this.state.saveOff) {
			return;
		}

		let userData = {
			id: this.state.id,
			email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			role: this.state.role,
		};

		$.ajax({
			url: '/Profile/ChangeDataRole',
			data: userData,
			beforeSend: function (xhr) {
				let token = sessionStorage.getItem('accessToken');
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			success: function(data) {
				alert('User data were successfully edited');
			},
			error: function(data) {
				alert('Something went wrong' + data);
			},
		});

		this.setState({ disabled: !this.state.disabled, });
	};

	deleteBtn() {
		let self = this;
		
		let userData = {
			email: this.state.email,
		};

		$.ajax({
			url: '/Admin/DeleteUser',
			data: userData,
			beforeSend: function (xhr) {
				let token = sessionStorage.getItem('accessToken');
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			success: function(data) {
				alert('User was successfully deleted');
				self.props.updateListOfUsers();
			},
			error: function(data) {
				alert('Something went wrong');
			},
		});
	};

	render() {
		const { classes, } = this.props;

		return (
			<div className={classes.container}>
				<FormControl className={classes.idForm} disabled>
					<InputLabel className={classes.disabledLabel}>ID</InputLabel>
					<Input value={this.state.id} className={classes.disabled} />
				</FormControl>

				<FormControl className={classes.formControl} disabled={this.state.saveOff}>
					<InputLabel className={classes.disabledLabel}>First Name</InputLabel>
					<Input value={this.state.firstName} className={classes.disabled}
					onChange={this.firstNameChange.bind(this)} />
				</FormControl>

				<FormControl className={classes.formControl} disabled={this.state.saveOff}>
					<InputLabel className={classes.disabledLabel}>Last Name</InputLabel>
					<Input value={this.state.lastName} className={classes.disabled}
					onChange={this.lastNameChange.bind(this)} />
				</FormControl>

				<FormControl className={classes.formControl} disabled>
					<InputLabel className={classes.disabledLabel}>Password</InputLabel>
					<Input value={this.state.password} className={classes.disabled} />
				</FormControl>

				<FormControl className={classes.formControl} disabled={this.state.saveOff}>
					<InputLabel className={classes.disabledLabel}>Email</InputLabel>
					<Input value={this.state.email} className={classes.disabled}
					 onChange={this.emailChange.bind(this)} />
				</FormControl>

				<div className={classes.buttonsWrapper}>
					<Button className={classes.button} onClick={this.editBtn.bind(this)}>
						{ this.state.saveOff ? 'Edit' : 'Save' }
					</Button>
					<Button className={classes.button} onClick={this.deleteBtn.bind(this)}>
						Delete
					</Button>
				</div>
			</div>
		);
	}
}

User.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
