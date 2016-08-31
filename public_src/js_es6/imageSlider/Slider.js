import React from 'react';
import ReactDOM from 'react-dom';

const slider = ({ name }) => (
	<div>{`Hi ${name}`}</div>
);

slider.propTypes = {
  name: React.PropTypes.string,
};
export default slider;
