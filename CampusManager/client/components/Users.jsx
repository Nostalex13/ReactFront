import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui/styles';
import $ from 'jquery';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import User from './User';
import AddUser from './AddUser';

const styles = theme => ({
	usersHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0 0 10px 10px',
		borderBottom: '1px solid black',
	},
	usersLogo: {
		paddingTop: '10px',
		fontFamily: 'Helvetica',
		fontSize: '22px',
	},
	addBtn: {
		display: 'inline-block',
		fontFamily: 'Helvetica',
		textTransform: 'none',
	},
   addUserText: {
      fontSize: '16px',
   },
   addUserIcon: {
      position: 'relative',
      top: '2px',
      width: '16px',
      height: '16px',
   },
	formControl: {
		margin: theme.spacing.unit,
  	},
	usersContent: {
		height: '505px',
		width: '666px',
		overflow: 'auto',
	},
	container: {
		width: '700px',
	},
});

class Users extends React.Component {
	state = {
		email: '',
		addingUser: false,
		listOfUsers: [],
	};

	updateListOfUsers() {
		let self = this;
		this.setState({ listOfUsers: [], });

		$.ajax({
			url: '/Admin/GetUsers',
			beforeSend: function (xhr) {
            let token = sessionStorage.getItem('accessToken');
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
			success: function(data) {
				self.setState({ listOfUsers: data, });
			},
			fail: function(data) {
				console.log('Unable to upload list of users');
			},
		});
	};

	addUser() {
		this.setState({ addingUser: true, });
	};

	cancelAddingUser() {
		this.setState({ addingUser: false, });
	};

	componentDidMount() {
		this.setState({ email: this.props.email, });
		this.updateListOfUsers();
	};

	render() {
		const { classes, } = this.props;
		const list = this.state.listOfUsers.map((item, index) => {
			if (item.email != this.state.email) {
				return 	<User id={item.id} email={item.email} password={item.password}
							firstName={item.firstName} lastName={item.lastName} role={item.role} key={index}
							updateListOfUsers={this.updateListOfUsers.bind(this)} />;
			}
		});

		return (
			<div className={classes.container}>
				<div className={classes.usersHeader}>
					<span className={classes.usersLogo}> Users </span>
					<Button className={classes.addBtn} onClick={this.addUser.bind(this)}>
                  <img src="Resources/icons/plus.png" className={classes.addUserIcon}/>
                  <span className={classes.addUserText}> Add User </span>
               </Button>
				</div>
				<div className={classes.usersContent}>
					{this.state.addingUser ? <AddUser cancelAddingUser={this.cancelAddingUser.bind(this)}
						updateListOfUsers={this.updateListOfUsers.bind(this)} /> : null }
					{list}
				</div>
			</div>
		);
	}
}

Users.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
