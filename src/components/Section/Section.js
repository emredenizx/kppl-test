import React, { useEffect, useReducer, useCallback } from "react";
import Line from "../Line";
import { mock } from "../mock-data";
import { mapChildren } from "../../utils";

const init = {
  structure: null,
  active_options: [],
  location: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setData':
      return {
        ...state,
        structure: action.payload
      }
    default:
      break;
  }
}

const Section = () => {

  const [data, dispatch] = useReducer(reducer, init)
  const structure = data.structure

  console.log('MAIN', data)

  const setData = useCallback((structure) => {
    const section = structure.find((item) => item.type === "section");
    const section_data = mapChildren(section, structure)
    dispatch({
      type: 'setData',
      payload: section_data
    })
}, []);

  useEffect(() => {
    const response = mock.data.structure;
    setData(response)
  }, [setData]);

  return (
    <>
      { structure &&
        <div className='section'>
          <h2 className='section-label'>{structure.properties.name}</h2>
          {/*  <div><ul>{options.map(option => <li>{option}</li>)}</ul></div> */}
          <div className='elements'>
            {structure.data.map((element) => (
              <Line
                key={element.id}
                line={element}
              />
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default Section;
