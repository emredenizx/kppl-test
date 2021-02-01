import React from 'react'
import Line from './Line'
import Text from './Text'
import Folder from './Folder'
import './style.css';

const Element = ({ ...props }) => {

    const { type, data } = props;

    if (type === 'line') {
        return data ? <Line {...props} /> : null
    }
    else if (type === 'text') {
        return <Text {...props} />;
    }
    else if (['section', 'folder'].includes(type)) {
        return <Folder {...props} />
    } else {
        return null;
    }
}

export default Element;