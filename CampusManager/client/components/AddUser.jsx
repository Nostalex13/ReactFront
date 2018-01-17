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
		width: '590px',
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

class AddUser extends React.Component {
	state = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		role: '',
	};

	emailChange(event) {
		this.setState({ email: event.target.value, });
	};

	passwordChange(event) {
		this.setState({ password: event.target.value, });
	};

	firstNameChange(event) {
		this.setState({ firstName: event.target.value, });
	};

	lastNameChange(event) {
		this.setState({ lastName: event.target.value, });
	};

	roleChange(event) {
		this.setState({ role: event.target.value, });
	};

	checkInputs() {
		if (this.state.email) {
			if (this.state.password) {
				if (this.state.firstName) {
					if (this.state.lastName) {
						if (this.state.role == 'User' || this.state.role == 'Admin') {
							return true;
						} else {
							alert('There is no such a Role');
							return false;
						}
					}
				}
			}
		}
		alert('Fill all the fields to add new user');

		return false;
	};

	addUserBtn() {
		let self = this;

		if(!this.checkInputs()) {
			return;
		}

		let userData = {
			Email: this.state.email,
			Password: this.state.password,
			FirstName: this.state.firstName,
			LastName: this.state.lastName,
			Role: this.state.role,
		};

		$.post({
			url: '/Admin/AddUser',
			contentType: 'application/json',
			data: JSON.stringify(userData),
			beforeSend: function (xhr) {
				let token = sessionStorage.getItem('accessToken');
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			success: function(data) {
				alert('User was successfully added');
				self.props.updateListOfUsers();
				self.props.cancelAddingUser();
			},
			error: function(data) {
				alert('Something went wrong' + data);
			},
		});

	};

	render() {
		const { classes, } = this.props;

		return (
			<div className={classes.container}>
				<FormControl className={classes.formControl}>
					<InputLabel className={classes.disabledLabel}>Email</InputLabel>
					<Input value={this.state.email}
					onChange={this.emailChange.bind(this)} />
				</FormControl>

				<FormControl className={classes.formControl}>
					<InputLabel className={classes.disabledLabel}>Password</InputLabel>
					<Input value={this.state.password}
					onChange={this.passwordChange.bind(this)} />
				</FormControl>

				<FormControl className={classes.formControl}>
					<InputLabel className={classes.disabledLabel}>First Name</InputLabel>
					<Input value={this.state.firstName}
					onChange={this.firstNameChange.bind(this)} />
				</FormControl>

				<FormControl className={classes.formControl}>
					<InputLabel className={classes.disabledLabel}>Last Name</InputLabel>
					<Input value={this.state.lastName}
					onChange={this.lastNameChange.bind(this)} />
				</FormControl>

				<FormControl className={classes.formControl}>
					<InputLabel className={classes.disabledLabel}>Role</InputLabel>
					<Input value={this.state.role}
					onChange={this.roleChange.bind(this)} />
				</FormControl>

				<div className={classes.buttonsWrapper}>
					<Button className={classes.button} onClick={this.addUserBtn.bind(this)}>
						Add User
					</Button>
					<Button className={classes.button} onClick={this.props.cancelAddingUser.bind(this)}>
						Cancel
					</Button>
				</div>
			</div>
		);
	}
}

AddUser.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddUser);
