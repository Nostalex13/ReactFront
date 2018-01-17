import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, } from 'material-ui/styles';
import $ from 'jquery';

const styles = theme => ({
	container: {
		margin: '25px 0',
		width: '750px',
		display: 'flex',
		flexDirection: 'column',
	},
});

class Chart extends React.Component {
	state = {
		chartData: [],
	};

	defineChartData() {
		let self = this;

		$.ajax({
			url: '/Income/GetGraphData',
			beforeSend: function (xhr) {
				let token = sessionStorage.getItem('accessToken');
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			success: function(data) {
				let newData = [];

				for (let item of data)
					newData.push([ new Date(Date.parse(item.pointDateTime)), item.pointValue ]);

				self.setState({ chartData: newData, });
				google.charts.load('current', {packages: ['corechart', 'line']});
				google.charts.setOnLoadCallback(function() {
					self.drawBasic(self);
				});
			},
			fail: function() {
				console.log('Unable to upload chart data');
			},
		});
	};

	drawBasic(self) {
		let data = new google.visualization.DataTable();
		data.addColumn('datetime', 'X');
		data.addColumn('number', 'Income');

		data.addRows(self.state.chartData);

		var options = {
			hAxis: {
				title: 'Time'
			},
			vAxis: {
				title: 'Clear Income'
			},
			height: 300,
			width: 950,
		};
		let chart = new google.visualization.LineChart(document.getElementById('chart_div'));
		chart.draw(data, options);
	};

	componentDidMount() {
		let self = this;
		this.defineChartData();
	};

	render() {
		const { classes, } = this.props;

		return (
			<div className={classes.container}>
				<div id="chart_div"></div>
			</div>
		);
	}
}

Chart.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chart);
