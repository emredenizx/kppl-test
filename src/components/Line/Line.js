import React, { useEffect, useState } from "react";
import { mock_suggestions } from "../../api/api.config";

import styles from './Line.module.css'

const Line = ({ line }) => {

  const { data } = line;
  const [options, setOptions] = useState(null)
  const [optionText, setOptionText] = useState([])



  /* const getData = useCallback(() => {
    const data = element.data.map(element => structure.find((item) => item.id === element));
    setData({
      ...element,
      elements: data
    })
  }, [element, structure])

  useEffect(() => {    
    getData()
  }, [getData])

  console.log('elements', data) */

  useEffect(() => {
    if (data) {
      data.forEach(element => {
        if (element.original.want) {
          const params = {
            "want": element.original.want,
            "active": ['']
          }

          const response = mock_suggestions(params)
          const options = response;

          setOptions(prev => ({
            ...prev,
            [element.original.id]: options
          }))

        } else {
          return
        }

      });
    }
  }, [data])

  const onClick = (name) => {
    setOptionText([...optionText, {
      data:{
      data:[''],
      properties: { name },
      type: 'text'}
    }])
  }

  return (
    <>
      <div className={styles.container}>
        {
          data && data.map(element =>
            <div
              className={styles.element}
              key={element.id}>
              <h2 className='label'>
                {element.properties.name}
              </h2>
              {options && options[element.original.id] &&
                <div className={styles.options}>
                  <ul>
                    {options[element.original.id].map(option =>
                      <li
                        key={option.id}
                        onClick={() => onClick(option.name)}
                      >
                        {option.name}
                      </li>
                    )}
                  </ul>
                </div>
              }
              {optionText && optionText.map(option => <Line line={option} />)}
            </div>)
        }
      </div>
      <div></div>
    </>
  );
};

export default Line;
