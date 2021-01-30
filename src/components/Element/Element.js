import React, { useState } from 'react'
import Options from "../Options";
import './style.css';

const Element = ({ ...props }) => {

    const [options, setOptions] = useState([]);

    const { type, data, original, properties } = props;  

    const onOptionClick = ({id,name}) =>{
        //console.log(id)
        const isActive = options.find(option => option.id === id)

        if(isActive){
           setOptions([...options.filter(option=> option.id !== id)])          
        } else{

        const newOption = {
            data:[''],
            id,
            original: {id, name},
            properties: {name},
            type:'text'
        }
        setOptions([...options, newOption])}
       
    }

    

    if (type === 'line') {
        return data ? data.map(item => <Element key={item.id} {...item} />) : null
    } else {
        return (
            <div className={type}>
                <p className='label'>{properties.name}</p>
                {original.want &&
                    <div className='options'>
                        <Options 
                        onOptionClick={onOptionClick}                        
                        {...original} />
                    </div>
                }
                {options && options.map(option=>
                    <Element key={option.id} {...option} />
                    )}

                {data[0] && data.map(item => <Element key={item.id} {...item} />)}
            </div>
        );
    }

}

export default Element;