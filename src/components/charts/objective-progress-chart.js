import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const ObjectiveProgressChart = () => {
	const data = [
    {name: 'Jan', actual: 2, target: 10, amt: 2400},
    {name: 'Feb', actual: 12, target: 18, amt: 2210},
    {name: 'Mar', actual: 19, target: 24, amt: 2290},
    {name: 'Apr', actual: 28, target: 32, amt: 2000},
    {name: 'May', actual: 34, target: 45, amt: 2181},
    {name: 'Jun', target: 52, amt: 2500},
    {name: 'Jul', target: 65, amt: 2100},
    {name: 'Aug',  target: 72, amt: 2100},
    {name: 'Sep',  target: 81, amt: 2100},
    {name: 'Oct',  target: 88, amt: 2100},
    {name: 'Nov',  target: 93, amt: 2100},
    {name: 'Dec',  target: 100, amt: 2100},
	];
	return (
    	<LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="target" stroke="#F3294D" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="actual" stroke="#010144" />
      </LineChart>
	)
}

export default ObjectiveProgressChart;