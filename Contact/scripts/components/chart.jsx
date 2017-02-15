import React from 'react';
import Chart from 'chart.js';

const Chartam = React.createClass(
		{
			_initChart() {
				if( window.myChartContainer )
					window.myChartContainer.destroy();

				const chart = this.props.chart;
				if( chart ) {
					let labels = [];
					let citations = [];
					let articles = [];
					chart.forEach(
							element => {
								labels.push( element.Year );
								citations.push( element.Citation );
								articles.push( element.WrittenArticles );
							}
					);
					const ctx = document.getElementById( "myChart" );
					Chart.defaults.global.defaultFontFamily = "Vazir, sans-serif";
					window.myChartContainer = new Chart(
							ctx, {
								type   : 'line',
								data   : {
									labels  : labels,
									datasets: [
										{
											label          : 'ارجاعات',
											data           : citations,
											borderColor    : 'rgb(255, 99, 132)',
											backgroundColor: 'rgba(255, 99, 132, 1)',
											fill           : false
										},
										{
											label          : "مقالات",
											borderColor    : 'rgb(100, 99, 132)',
											backgroundColor: 'rgba(100, 99, 132, 1)',
											data           : articles,
											fill           : true
										}
									]
								},
								options: {
									scales: {
										yAxes: [
											{
												ticks: {
													beginAtZero: true
												}
											}
										]
									},
									legend: {
										labels: {
											fontStyle: "bold"
										}
									}
								}
							}
					);
				}
			},

			render() {
				return (
						<div style={{ margin: '20px auto', width: '90%', height: 200, direction: 'rtl' }}>
							<canvas id="myChart"/>
						</div>
				);
			},

			componentDidUpdate() {
				this._initChart();
			},

			shouldComponentUpdate( nextProps ) {
				return nextProps.p_id !== this.props.p_id;
			}
		}
);

export default Chartam;
