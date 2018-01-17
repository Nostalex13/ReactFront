import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui/styles';
import Input, { InputLabel, } from 'material-ui/Input';
import { FormControl, FormHelperText, } from 'material-ui/Form';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import $ from 'jquery';
import { Route } from 'react-router';
import { Link } from 'react-router-dom'

const styles = theme => ({
	container: {
		margin: '140px auto',
		width: '210px',
		display: 'flex',
		flexDirection: 'column',
	},
	button: {
		alignSelf: 'flex-end',
		padding: '0',
		lineHeight: '36px',
	},
	linkTo: {
		textDecoration: 'none',
		color: 'black',
		width: 'inherit',
	},
	forgotPassword: {
		margin: '5px 0',
		alignSelf: 'flex-end',
		fontSize: '14px',
		textTransform: 'none',
	},
	logo: {
		marginBottom: '25px',
		textAlign: 'center',
		fontSize: '22px',
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
	},
});

class Login extends React.Component {
	state = {
		email: '',
		password: '',
	};

	emailChange(event) {
		this.setState({ email: event.target.value, });
	};

	passwordChange(event) {
		this.setState({ password: event.target.value, });
	};

	signIn(event) {
		let self = this;

		const loginData = {
			username: this.state.email,
			password: this.state.password,
			grant_type: 'password',
		};

		$.post({
			url: '/token',
			async: false,
			data: loginData,
			success: function(data) {
				sessionStorage.setItem('accessToken', data.access_token);
				sessionStorage.setItem('currentEmail', self.state.email);
			},
			error() {
				alert('You have entered wrong data. Please check your email and password values');
				event.preventDefault();
			},
		});
	};

	forgotPass(event) {
		event.preventDefault();
		const email = {
			email: this.state.email,
		};

		$.ajax({
			url: '/Account/RenewPassword',
			data: email,
			success: function(data) {
				console.log(data);
			},
			fail: function(data) {
				console.log('data');
			},
		});
	};

	render() {
		const { classes, } = this.props;

		return (
			<div className={classes.container}>

				<p className={classes.logo}> Campus Manager </p>

				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="email"> Email </InputLabel>
					<Input id="name-Login" value={this.state.email}
					onChange={this.emailChange.bind(this)} />
				</FormControl>

				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="password"> Password </InputLabel>
					<Input id="password-Login" value={this.state.password}
					onChange={this.passwordChange.bind(this)} />
				</FormControl>

				<Button color="primary" className={classes.forgotPassword}
				onClick={this.forgotPass.bind(this)}>
					Forgot password?
				</Button>
				<Button raised className={classes.button}>
					<Link to="/account" className={classes.linkTo}
					onClick={this.signIn.bind(this)}>
						Sign In
					</Link>
				</Button>
			</div>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
