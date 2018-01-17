import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui/styles';
import $ from 'jquery';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';

const styles = theme => ({
	container: {
		width: '700px',
	},
	profileHeader: {
		marginTop: '12px',
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0 0 9px 10px',
		borderBottom: '1px solid black',
	},
	profileLogo: {
		fontFamily: 'Helvetica',
		fontSize: '22px',
	},
	button: {
		alignSelf: 'flex-end',
		margin: '0 5px',
	},
	formControl: {
		margin: '5px 25px',
		width: '50%',
  	},
	profileContent: {
		display: 'flex',
		flexDirection: 'column',
	},
	editOn: {
		color: 'black',
	},
	buttonsWrapper: {
		alignSelf: 'flex-end',
		marginTop: '30px',
	},
});

class Profile extends React.Component {
	state = {
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		role: '',
		editOn: true,
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

	changePass() {
		this.props.enterChangingPass();
	};

	saveBtn(event) {
		this.setState({ editOn: !this.state.editOn, });
		let self = this;

		if (this.state.editOn) {
			return;
		}

		let newData = {
			id: this.state.id,
			email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
		};

		$.ajax({
			url: '/Profile/ChangeData',
			data: newData,
			beforeSend: function (xhr) {
				let token = sessionStorage.getItem('accessToken');
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success: function(data) {
				self.props.updateEmail(newData.email);
				alert('Your data have been successfully updated');
			},
			error: function(data) {
				console.log('chtoto poshlo ne tak');
			},
		});
	};

	componentDidMount() {
		let self = this;
		$.ajax({
			url: '/Profile/UserData',
			beforeSend: function (xhr) {
				let token = sessionStorage.getItem('accessToken');
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success: function(data) {
				self.setState({
					id: data.id,
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastName,
					role: data.role,
				});
				self.props.updateRole(data.role);
			},
			error: function(data) {
				console.log('chtoto poshlo ne tak');
			},
		});
	};

	render() {
		const { classes, } = this.props;

		return (
			<div className={classes.container}>
				<div className={classes.profileHeader}>
					<span className={classes.profileLogo}> Profile </span>
				</div>
				<div className={classes.profileContent}>
					<FormControl className={classes.formControl}
					disabled={this.state.editOn ? true : false}>
						<InputLabel>First Name</InputLabel>
						<Input value={this.state.firstName} className={classes.editOn} onChange={this.firstNameChange.bind(this)} />
				   </FormControl>

					<FormControl className={classes.formControl}
					disabled={this.state.editOn ? true : false}>
						<InputLabel>Last Name</InputLabel>
						<Input value={this.state.lastName} className={classes.editOn}
						onChange={this.lastNameChange.bind(this)} />
				   </FormControl>

					<FormControl className={classes.formControl}
					disabled={this.state.editOn ? true : false}>
						<InputLabel> Email </InputLabel>
						<Input value={this.state.email} className={classes.editOn}
						onChange={this.emailChange.bind(this)} />
				   </FormControl>

					<div className={classes.buttonsWrapper}>
						<Button raised className={classes.button} onClick={this.saveBtn.bind(this)}>
							{ this.state.editOn ? 'Edit' : 'Save' }
						</Button>
						<Button raised className={classes.button} onClick={this.props.enterChangingPass}>
							Change password
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
