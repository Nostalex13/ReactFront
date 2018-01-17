import React from 'react';
import Button from 'material-ui/Button';
import $ from 'jquery';
import { Route, } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui/styles';
import Input, { InputLabel, } from 'material-ui/Input';
import { FormControl, FormHelperText, } from 'material-ui/Form';

const styles = theme => ({
   newIncomeWrapper: {
		position: 'absolute',
      top: '0',
      left: '0',
		width: '100%',
		height: '100%',
		textAlign: 'center',
		background: 'rgba(0, 0, 0, 0.5)',
		zIndex: '1',
	},
	newIncomeContainer: {
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
	newIncomeTitle: {
		marginBottom: '25px',
		textAlign: 'center',
		fontSize: '22px',
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
	},
});

class AddNewIncome extends React.Component {
	state = {
		description: '',
		sum: '',
		tax: '',
	};

   descriptionChange(event) {
		this.setState({ description: event.target.value, });
	};

	sumChange(event) {
		this.setState({ sum: event.target.value, });
	};

	taxChange(event) {
		this.setState({ tax: event.target.value, });
	};

   addIncome() {
      let self = this;

      let incomeData = {
         description: this.state.description,
         sum: parseFloat(this.state.sum),
         tax: parseInt(this.state.tax),
      };

		$.ajax({
			url: '/Income/AddIncome',
         data: incomeData,
			beforeSend: function (xhr) {
				let token = sessionStorage.getItem('accessToken');
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success: function() {
            alert('Income was successfully added');
            self.props.updateListOfIncomes();
            self.props.cancelBtn();
			},
			error: function() {
				alert('chtoto poshlo ne tak');
			},
		});
   };

   render() {
      const { classes, } = this.props;

      return (
			<div className={classes.newIncomeWrapper}>
            <div className={classes.newIncomeContainer}>

               <p className={classes.newIncomeTitle}> New Income </p>

               <FormControl className={classes.formControl}>
                  <InputLabel>Description</InputLabel>
                  <Input value={this.state.description} onChange={this.descriptionChange.bind(this)} />
               </FormControl>

               <FormControl className={classes.formControl}>
                  <InputLabel>Sum</InputLabel>
                  <Input value={this.state.sum} onChange={this.sumChange.bind(this)} />
               </FormControl>

               <FormControl className={classes.formControl}>
                  <InputLabel>Tax</InputLabel>
                  <Input value={this.state.tax}
                  onChange={this.taxChange.bind(this)} />
               </FormControl>

               <div className={classes.buttonsWrapper}>
                  <Button className={classes.button}
                  onClick={this.addIncome.bind(this)}>
                     Add
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

AddNewIncome.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNewIncome);
