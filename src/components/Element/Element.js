import React, { useState } from 'react'
import Options from "../Options";
import './style.css';

const Element = ({ suggestion_params, dispatch, ...props }) => {

    const { type, data, original, properties } = props;
    const [selectedOptions, setSelectedOption] = useState([]);

    //console.log(`${type}`, suggestion_params)

    const onOptionSelect = (want, { id, name }, locations) => {
        const isActive = selectedOptions.find(option => option.id === id)

        if (isActive) {
            setSelectedOption([...selectedOptions.filter(option => option.id !== id)])
            dispatch({
                type: 'REMOVE_ACTIVE_OPTION',
                payload: {
                    want,
                    id
                }
            })
        } else {
            const newSelectedOption = {
                data: [''],
                id,
                original: { id, name },
                properties: { name },
                type: 'text'
            }
            setSelectedOption([...selectedOptions, newSelectedOption])
            dispatch({
                type: 'ADD_ACTIVE_OPTION',
                payload: {
                    want,
                    id,
                    locations
                }
            })
        }
    }

    if (type === 'line') {
        return data ? data.map(item => <Element key={item.id} dispatch={dispatch} suggestion_params={suggestion_params} {...item} />) : null
    }
    else if (type === 'text') {
        return (
            <div className={type}>
                {properties.name}
                {data[0] && data.map(item => <Element key={item.id} dispatch={dispatch} suggestion_params={suggestion_params} {...item} />)}
            </div>
        );
    }
    else if (['section', 'folder'].includes(type)) {
        return (
            <div className={type}>
                <p className='label'>{properties.name}</p>
                {original.want &&
                    <div className='options'>
                        <Options
                            onOptionSelect={onOptionSelect}
                            type={type}
                            locations={properties.locations}
                            suggestion_params={suggestion_params}
                            {...original} />
                    </div>
                }
                {selectedOptions &&
                    selectedOptions.map(option =>
                        <Element key={option.id} suggestion_params={null} {...option} />
                    )}
                {data[0] && data.map(item => <Element key={item.id} dispatch={dispatch} suggestion_params={suggestion_params} {...item} />)}
            </div>
        );
    } else {
        return null;
    }
}

export default Element;