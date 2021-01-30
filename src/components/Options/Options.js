import React, { useEffect, useState } from 'react'
import { mock_suggestions } from "../../api/api.config";

const Options = ({ onOptionClick, ...props }) => {

  const { id, want } = props;
  const [options, setOptions] = useState(null)
  const [active, setActive] = useState({})

  console.log(active)

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


  const onClick = (option) => {
    let id;
    active[option.id] ? id = '' : id = option.id
    setActive({ ...active, [option.id]: id });
    onOptionClick(option);
  }

  return (
    <>
      {options && options[id] &&
        <ul>
          {options[id].map(option =>
            <li
              className={`option ${active[option.id] ? 'active' : ''}`}
              key={option.id}
              onClick={() => onClick(option)}
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