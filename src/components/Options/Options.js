import React, { useEffect, useState } from 'react'
import { getSuggestions } from "../../api/api.config";

const Options = ({ onOptionSelect, type, suggestion_params, ...original }) => {

  const { want } = original;
  const [options, setOptions] = useState([])
  const [active, setActive] = useState({})

  //console.log('OPTIONS', options)

  /* console.log(type)
  console.log(suggestion_params)
  console.log(original) */
  let active_params;
  type === 'section' ?
    active_params = suggestion_params.active_options[type]
    :
    active_params = suggestion_params.active_options[want]

    //console.log(active_params)

  useEffect(() => {      
      (async () => {       
        const params = { "want": want, "active": [...(active_params || [])] }         
        try {
          const response = await getSuggestions(params);  
          console.log(response)      
          setOptions([...response.data.data.response])
        } catch (error) {
          console.log(error)
        } 
      })()   
  }, [active_params, want])


  const onClick = (option) => {
    let id;
    active[option.id] ? id = '' : id = option.id
    setActive({ ...active, [option.id]: id });
    onOptionSelect(want, option);
  }

  return (
    <>
      {options &&
        <ul>
          {options.map(option =>
            <li className={`option ${active[option.id] ? 'active' : ''}`} key={option.id} onClick={() => onClick(option)} >
              {option.name}
            </li>
          )}
        </ul>
      }
    </>
  );

}

export default Options