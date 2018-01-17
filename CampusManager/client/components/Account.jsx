import React from 'react';
import { Route, } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui/styles';
import Input, { InputLabel, } from 'material-ui/Input';
import { Link } from 'react-router-dom'
import { FormControl, FormHelperText, } from 'material-ui/Form';
import { MenuList, MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import $ from 'jquery';
import Users from './Users';
import Profile from './Profile';
import Incomes from './Incomes';
import ChangingPassword from './ChangingPassword';
import Button from 'material-ui/Button';

const styles = theme => ({
	container: {
		display: 'flex',
		minWidth: '1050px',
		maxWidth: '1050px',
		margin: '0',
		flexDirection: 'flex-start',
	},
	content: {
		width: '970px',
		margin: '51px 0 0 50px',
	},

	// Account menu bar styles

	itemIcon: {
		width: '16px',
		height: '16px',
	},
	accountBar: {
		margin: 0,
		width: '200px',
		minWidth: '200px',
		height: '662px',
		boxShadow: '-14px 0 26px 10px rgba(0, 0, 0, .75)',
		background: '#fafafa',
	},
	accountHeader: {
		padding: '10px 0 10px 0',
		width: '100%',
		background: '#616161',
		boxSizing: 'border-box',
	},
	accountMenu: {
		padding: 0,
		listStyle: 'none',
		fontFamily: 'Helvetica',
	},
	accountEmail: {
		display: 'block',
		margin: '10px 0 0 10px',
		fontFamily: 'Helvetica',
		color: '#dec9c9',
	},
	accountItem: {
		margin: '5px 0',
		paddingLeft: '50px',
	},
	image: {
		height: '15px',
		width: '15px',
	},
	menuItem: {
		paddingLeft: '35px',
	},
	paper: {
		boxShadow: 'none',
		background: 0,
	},
	bigAvatar: {
		marginLeft: '10px',
		width: 50,
		height: 50,
 	},
	linkTo: {
		paddingLeft: '5px',
		textDecoration: 'none',
		color: '#dec9c9',
		fontFamily: 'Helvetica',
	},
	logOutIcon: {
		width: '24px',
		height: '24px',
	},
	logOut: {
		float: 'right',
		margin: '0',
		textAlign: 'right',
		paddingRight: '10px',
	},
	specialClass: {
		textDecoration: 'none',
		overflow: 'visible',
		height: '50px',
		paddingLeft: '65px',
	},
	specialBtn: {
		whiteSpace: 'normal',
		color: 'black',
		fontFamily: 'Helvetica',
	},
	customLink: {
		textDecoration: 'none',
	},
});

class Account extends React.Component {
	state = {
		email: '',
		role: '',
		currentTab: 'Profile',
		isChangingPass: false,
	};

	componentDidMount() {
		this.setState({ email: sessionStorage.getItem('currentEmail'), });
	};

	updateRole(_role) {
		this.setState({ role: _role, });
		// better to use GetRole() from ValuesController directly, but it`s not implemented yet
	};

	updateEmail(_email) {
	 	this.setState({ email: _email, });
	};

	// Account menu section

	changeToProfile(event) {
		this.setState({ currentTab: 'Profile', });
	};

	changeToUsers(event) {
		this.setState({ currentTab: 'Users', });
	};

	changeToIncomes(event) {
		this.setState({ currentTab: 'Incomes', });
	};

	logOut() {
		sessionStorage.setItem('accessToken', '');
	};

	// Changing password section

	cancelBtn() {
		this.setState({ isChangingPass: false, });
	};

	enterChangingPass() {
		this.setState({ isChangingPass: true, });
	};

	render() {
		const { classes, } = this.props;

		let component;

		if (this.state.currentTab == 'Profile')
			component = <Profile updateRole={this.updateRole.bind(this)}
							enterChangingPass={this.enterChangingPass.bind(this)}
							updateEmail={this.updateEmail.bind(this)} />;
		else if (this.state.currentTab == 'Users')
			component = <Users email={this.state.email} />;
			else if (this.state.currentTab == 'Incomes')
				component = <Incomes />;

		return (
			<div className={classes.container}>
				{this.state.isChangingPass ? <ChangingPassword
					cancelBtn={this.cancelBtn.bind(this)} email={this.state.email} /> : null }
				<div className={classes.accountBar}>

					<div className={classes.accountHeader}>
						<p className={classes.logOut}>
							<Link to="/" className={classes.linkTo}>
								<img src="Resources/icons/logout.png" className={classes.logOutIcon} onClick={this.logOut}/>
							</Link>
						</p>
						<Avatar
							alt="Avatar"
							src="Resources/icons/icon.png"
							className={(classes.avatar, classes.bigAvatar)}
						/>
						<span className={classes.accountEmail}>{this.state.email}</span>
					</div>

					<Paper className={classes.paper}>
						<MenuList>
							<MenuItem className={classes.menuItem} onClick={this.changeToProfile.bind(this)}>
								<img src="Resources/icons/profile.png" className={classes.itemIcon}/>
								<ListItemText className={ classes.text } inset primary="Profile" />
							</MenuItem>

							{this.state.role == "Admin" ? (
								<MenuItem className={classes.menuItem}
								onClick={this.changeToUsers.bind(this)}>
									<img src="Resources/icons/users.png" className={classes.itemIcon}/>
									<ListItemText className={ classes.text } inset primary="Users" />
								</MenuItem> ) : null }

							<MenuItem className={classes.menuItem}
							onClick={this.changeToIncomes.bind(this)}>
								<img src="Resources/icons/income.png" className={classes.itemIcon}/>
								<ListItemText className={ classes.text } inset primary="Incomes" />
							</MenuItem>

							<MenuItem className={classes.specialClass}
							onClick={this.changeToIncomes.bind(this)}>
								<Link to="/static/index.html" className={classes.customLink}>
									<p className={classes.specialBtn}>
										Contractor assignment tracker
									</p>
								</Link>
							</MenuItem>
						</MenuList>
					</Paper>

				</div>
				<div className={classes.content}>
					{component}
				</div>
			</div>
		);
	}
}

Account.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
