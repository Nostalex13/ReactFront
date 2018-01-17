import React from 'react';
import Button from 'material-ui/Button';
import $ from 'jquery';
import { Route, } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui/styles';
import Input, { InputLabel, } from 'material-ui/Input';
import { FormControl, FormHelperText, } from 'material-ui/Form';

const styles = theme => ({
   changingPassWrapper: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		textAlign: 'center',
		background: 'rgba(0, 0, 0, 0.5)',
		zIndex: '1',
	},
	changingPassContainer: {
		display: 'inline-block',
		marginTop: '170px',
		padding: '10px',
		width: '400px',
		flexDirection: 'column',
		background: '#fafafa',
		boxShadow: '4px 5px 20px -7px rgba(0, 0, 0, .75)',
		borderRadius: '3px',
		boxSizing: 'border-box',
	},
	formControl: {
		width: '70%',
	},
	buttonsWrapper: {
		marginTop: '20px',
	},
	changingPassTitle: {
		marginBottom: '25px',
		textAlign: 'center',
		fontSize: '22px',
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
	},
});

class ChangingPassword extends React.Component {
	state = {
		oldPass: '',
		newPass: '',
		newPassChange: '',
	};

   oldPassChange(event) {
		this.setState({ oldPass: event.target.value, });
	};

	newPassChange(event) {
		this.setState({ newPass: event.target.value, });
	};

	newPassRepeatChange(event) {
		this.setState({ newPassRepeat: event.target.value, });
	};

   saveBtn() {
      let self = this;

      let passwordData = {
         email: this.props.email,
         oldPassword: this.state.oldPass,
         newPassword: this.state.newPass,
         newPasswordRepeat:  this.state.newPassRepeat,
      };

		$.ajax({
			url: '/Profile/ChangePassword',
         data: passwordData,
			beforeSend: function (xhr) {
				let token = sessionStorage.getItem('accessToken');
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success: function(data) {
            alert('Password was successfully changed');
            self.props.cancelBtn();
			},
			error: function(data) {
				alert('chtoto poshlo ne tak');
			},
		});
   };

   render() {
      const { classes, } = this.props;

      return (
			<div className={classes.changingPassWrapper}>
            <div className={classes.changingPassContainer}>

               <p className={classes.changingPassTitle}> Changing Password </p>

               <FormControl className={classes.formControl}>
                  <InputLabel>Old Password</InputLabel>
                  <Input value={this.state.oldPass} onChange={this.oldPassChange.bind(this)} />
               </FormControl>

               <FormControl className={classes.formControl}>
                  <InputLabel>New Password</InputLabel>
                  <Input value={this.state.newPass} onChange={this.newPassChange.bind(this)} />
               </FormControl>

               <FormControl className={classes.formControl}>
                  <InputLabel>Repeat New Password</InputLabel>
                  <Input value={this.state.newPassRepeat}
                  onChange={this.newPassRepeatChange.bind(this)} />
               </FormControl>

               <div className={classes.buttonsWrapper}>
                  <Button className={classes.button}
                  onClick={this.saveBtn.bind(this)}>
                     Save
                  </Button>
                  <Button className={classes.button}
                  onClick={this.props.cancelBtn}>
                     Cancel
                  </Button>
               </div>

            </div>
         </div>
      );
   }
}

ChangingPassword.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangingPassword);
