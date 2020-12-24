import React from 'react';
import { Line } from 'react-chartjs-2';

export const MultiAxisLine = (props) => {
  const { data, options } = props;
  return <Line data={data} options={options} />;
};
