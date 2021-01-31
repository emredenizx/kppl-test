import React, { useEffect, useReducer, useCallback } from "react";
import { mock } from "../mock-data";
import { mapChildElements } from "../../utils";
import Element from "../Element";

const initial_data = {
  section: null,
  suggestion_params: {
    active_options: {
      section: []
    },
    folder_locations: []
  }
}

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA': {
      const { section_data, initial_active_option } = action.payload;
      return {
        ...state,
        section: section_data,
        suggestion_params: {
          ...state.suggestion_params,
          active_options: {
            ...state.suggestion_params.active_options,
            section: [
              ...(state.suggestion_params.active_options.section || []),
              initial_active_option
            ]
          }
        },
      }
    }
    case 'ADD_ACTIVE_OPTION': {
      const { id, want } = action.payload;
      return {
        ...state,
        suggestion_params: {
          ...state.suggestion_params,
          active_options: {
            ...state.suggestion_params.active_options,
            section: [
              ...(state.suggestion_params.active_options.section || []),
              id
            ],
            [want]: [
              ...(state.suggestion_params.active_options[want] || []),
              id
            ]
          }
        },
      }      
    }
    case 'REMOVE_ACTIVE_OPTION': {
      const { id, want } = action.payload;
      return {
        ...state,
        suggestion_params: {
          ...state.suggestion_params,
          active_options: {
            ...state.suggestion_params.active_options,
            section: [
              ...(state.suggestion_params.active_options.section || []),
              id
            ],
            [want]: [
              ...(state.suggestion_params.active_options[want] || []),
              id
            ]
          }
        },
      }      
    }
    default:
      break;
  }
}

const Section = () => {

  const [data, dispatch] = useReducer(dataReducer, initial_data);

  const section = data.section;
  const suggestion_params = data.suggestion_params;
  // console.log(data)

  const setData = useCallback((data) => {
    const section = data.find((item) => item.type === "section");
    const section_data = mapChildElements(section, data)

    const firstTextElement = data.find((item) => item.type === "text")
    const initial_active_option = firstTextElement.original.id;

    dispatch({
      type: 'SET_DATA',
      payload: {
        section_data,
        initial_active_option
      }
    })
  }, []);

  useEffect(() => {
    const response = mock.data.structure;
    setData(response)
  }, [setData]);

  return (
    <>
      { section &&
        <Element
          suggestion_params={suggestion_params}
          dispatch={dispatch}
          {...section} />
      }
    </>
  );
};

export default Section;
