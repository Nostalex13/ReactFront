import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui/styles';
import $ from 'jquery';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Income from './Income';
import Chart from './Chart';
import AddNewIncome from './AddNewIncome';

const styles = theme => ({
   root: {
      width: '104%',
      marginTop: theme.spacing.unit * 3,
   },
   table: {
      minWidth: 800,
   },
   tableWrapper: {
      overflowX: 'auto',
   },
   incomesHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '970px',
		padding: '0 0 10px 10px',
		borderBottom: '1px solid black',
	},
	incomesLogo: {
		paddingTop: '10px',
		fontFamily: 'Helvetica',
		fontSize: '22px',
	},
	incomesContent: {
      padding: '0 40px 5px 3px',
      height: '510px',
      overflow: 'auto',
	},
   titleCell: {
      paddingRight: '40px',
   },
	addBtn: {
		display: 'inline-block',
		fontFamily: 'Helvetica',
		textTransform: 'none',
	},
   graphBtn: {
		display: 'inline-block',
		fontFamily: 'Helvetica',
		textTransform: 'none',
   },
   addIncomeText: {
      fontSize: '16px',
   },
   addUserIcon: {
      position: 'relative',
      top: '2px',
      width: '16px',
      height: '16px',
   },
   incomeText: {
      fontSize: '16px',
      margin: '10px 5px',
      fontFamily: 'Helvetica',
   },
});

class Incomes extends React.Component {
   state = {
      incomesList: [],
      isAddingIncome: false,
      showGraph: false,
      totalIncome: 0,
      totalClearIncome: 0,
   };

   updateListOfIncomes() {
      let self = this;
      this.setState({ incomesList: [], });

		$.ajax({
			url: '/Income/GetIncomes',
			beforeSend: function (xhr) {
            let token = sessionStorage.getItem('accessToken');
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
			success: function(data) {
				self.setState({ incomesList: data, });
			},
			fail: function() {
				console.log('Unable to upload list of incomes');
			},
		});
      this.getIncomes();
   };

   getIncomes() {
      let self = this;

      $.ajax({
			url: '/Income/GetTotalIncome',
			beforeSend: function (xhr) {
            let token = sessionStorage.getItem('accessToken');
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
			success: function(data) {
				self.setState({ totalIncome: data.toFixed(2), });
			},
			fail: function() {
				console.log('Unable to upload total income!');
			},
		});

      $.ajax({
			url: '/Income/GetTotalClearIncome',
			beforeSend: function (xhr) {
            let token = sessionStorage.getItem('accessToken');
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
			success: function(data) {
				self.setState({ totalClearIncome: data.toFixed(2), });
			},
			fail: function() {
				console.log('Unable to upload total clear income!');
			},
		});
   };

   cancelBtn() {
      this.setState({ isAddingIncome: false, });
   };

   AddNewIncome() {
      this.setState({ isAddingIncome: true, });
   };

   ShowGraph() {
      this.setState({ showGraph: !this.state.showGraph, });
   };

   componentDidMount() {
      this.updateListOfIncomes();
   };

   render() {
      const { classes, } = this.props;
      const list = this.state.incomesList.map((item, index) => {
			return 	<Income key={item.id} id={item.id} description={item.description} user={item.ownedUserName}
                  date={item.addDate} sum={item.sum} tax={item.tax} income={item.clearIncome}
						updateListOfIncomes={this.updateListOfIncomes.bind(this)} />;
		});

      return (
         <div className={classes.container}>
            {this.state.isAddingIncome ? <AddNewIncome cancelBtn={this.cancelBtn.bind(this)}
               updateListOfIncomes={this.updateListOfIncomes.bind(this)}/> : null }
            <div className={classes.incomesHeader}>
               <span className={classes.incomesLogo}> Incomes </span>
               <div>
                  <Button className={classes.graphBtn} onClick={this.ShowGraph.bind(this)}>
                     <span className={classes.addIncomeText}>
                        {this.state.showGraph ? 'Show Table' : 'Show Graph' }
                     </span>
                  </Button>
                  <Button className={classes.addBtn} onClick={this.AddNewIncome.bind(this)}
                  disabled={this.state.showGraph ? true : false }>
                     {this.state.showGraph ? (
                           <img src="Resources/icons/plus-disabled.png" className={classes.addUserIcon}/>
                        ) : (
                           <img src="Resources/icons/plus.png" className={classes.addUserIcon}/>
                        )}
                     <span className={classes.addIncomeText}> Add Income </span>
                  </Button>
               </div>
            </div>
            {this.state.showGraph ? (
               <div>
                  <Chart />
               </div>
            ) : (
               <div className={classes.incomesContent}>
                  <div>
                     <p className={classes.incomeText}> Total Income: {this.state.totalIncome} </p>
                     <p className={classes.incomeText}> Total Clear Income: {this.state.totalClearIncome} </p>
                  </div>
                  <Paper className={classes.root}>
                     <Table className={classes.table}>
                        <TableHead>
                           <TableRow className={classes.topRow}>
                              <TableCell className={classes.titleCell}>Title</TableCell>
                              <TableCell>User</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell numeric>Sum($)</TableCell>
                              <TableCell numeric>Tax(%)</TableCell>
                              <TableCell numeric>Income($)</TableCell>
                              <TableCell></TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {list}
                        </TableBody>
                     </Table>
                  </Paper>
               </div>
               )}

         </div>
      );
   }
}

Incomes.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Incomes);
