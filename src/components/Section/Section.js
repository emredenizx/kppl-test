import React, { useEffect, useReducer, useCallback } from "react";
import { mock } from "../mock-data";
import { mapChildren } from "../../utils";
import Element from "../Element";

const init = {
  section: null,
  active_options: [],
  location: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setData':
      return {
        ...state,
        section: action.payload
      }
    default:
      break;
  }
}

const Section = () => {

  const [data, dispatch] = useReducer(reducer, init)
  const section = data.section

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
      { section &&
        <Element {...section} />
      }
    </>
  );
};

export default Section;
