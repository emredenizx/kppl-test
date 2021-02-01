import React from 'react';
import Element from '../Element'

const Text = ({ ...props }) => {
    const { properties, data } = props;
    return (
        <div className='text'>
            {properties.name}
            {data[0] && data.map(item => <Element key={item.id} {...item} />)}
        </div>
    );
}

export default Text;