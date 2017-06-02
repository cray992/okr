import React from 'react';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const ObjectiveProgressChart = ({data}) => {
	return (
    <ComposedChart width={400} height={300} data={data}
          margin={{top: 20, right: 20, bottom: 20, left: 20}}>
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip/>
        <Legend/>
        <CartesianGrid stroke='#f5f5f5'/>
        <Bar dataKey='target' barSize={15} fill='#0F0F59'/>
        <Line type='monotone' dataKey='actual' stroke='#F42A4D'/>
        <Line type='monotone' dataKey='projected' stroke='#EA40AC'/>
     </ComposedChart>
	)
}

export default ObjectiveProgressChart;