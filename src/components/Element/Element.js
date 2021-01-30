import React from 'react'
import Options from "../Options";
import './style.css';

const Element = ({ ...props }) => {

    const { type, data, original, properties } = props;
    console.log(props)
    if (type === 'line') {
        return data ? data.map(item => <Element key={item.id} {...item} />) : null
    } else {
        return (
            <div className={type}>
                <p className='label'>{properties.name}</p>
                {original.want &&
                    <div className='options'><Options {...original} /></div>
                }
                {data[0] && data.map(item => <Element key={item.id} {...item} />)}
            </div>
        );
    }

}

export default Element;