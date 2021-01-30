import React, {useEffect, useState} from 'react'
import { mock_suggestions } from "../../api/api.config";

const Options = ({...props})=> {
    const {id, want} = props;

    const [options, setOptions] = useState(null)


    useEffect(() => {
       
            if (want) {
              const params = {
                "want": want,
                "active": ['']
              }
    
              const response = mock_suggestions(params)
              const options = response;
    
              setOptions(prev => ({
                ...prev,
                [id]: options
              }))
    
            } else {
              return
            }    
          
      }, [id, want])

      const onClick = (name) => {
        /* setOptionText([...optionText, {
          data:{
          data:[''],
          properties: { name },
          type: 'text'}
        }]) */
      }

    return(
        <>
        {options && options[id] &&            
              <ul>
                {options[id].map(option =>
                  <li
                    key={option.id}
                    onClick={() => onClick(option.name)}
                  >
                    {option.name}
                  </li>
                )}
              </ul>           
          }
          </>
    );

}

export default Options