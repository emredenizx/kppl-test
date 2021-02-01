import React from 'react';
import Element from '../Element'

const Line = ({ ...props }) => {
    const { data } = props;
    return data.map(item => <Element key={item.id} {...item} />)
};

export default Line;