import React, { useEffect, useReducer, useCallback } from "react";
import * as actions from './actions'
import Element from "../Element";
import SectionReducer from "./Section.Reducer";
import { SectionContext, initial_data } from "./Section.Context";
import { mapChildElements } from "./utils";
import { getStructure } from "../../api/section.api";

const Section = () => {

  const [data, dispatch] = useReducer(SectionReducer, initial_data);
  const { section,suggestion_params, selected_options } = data;  

  const setData = useCallback((data) => {
    const section = data.find((item) => item.type === "section");
    const section_data = mapChildElements(section, data)

    const firstTextElement = data.find((item) => item.type === "text")
    const initial_active_option = firstTextElement.original.id;

    dispatch({
      type: actions.SET_DATA,
      payload: {
        section_data,
        initial_active_option
      }
    })
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await getStructure();
        setData(response.data.data.structure)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [setData]);

  return (
    <>
      { section &&
        <SectionContext.Provider value={{ suggestion_params, selected_options, dispatch }}>
          <Element
            {...section} />
        </SectionContext.Provider>
      }
    </>
  );
};

export default Section;

