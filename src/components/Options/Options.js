import React, { useContext, useEffect, useMemo, useState } from 'react'
import { getSuggestions } from "../../api/api.config";
import { countLocationMatch } from "./utils.js";
import { SectionContext } from "../Section/Section.Context";

const Options = ({ onOptionSelect, type, locations, ...original }) => {

  const { want } = original;
  const [options, setOptions] = useState([])
  const [active, setActive] = useState({})
  const [locationMatch, setLocationMatch] = useState(0)

  const {suggestion_params} = useContext(SectionContext)

  let active_options;
  type === 'section' ?
    active_options = suggestion_params.active_options[type]
    :
    active_options = suggestion_params.active_options[want]

  const option_locations = useMemo(()=>{
    return locations ? [...locations.map(location => location.name)] : []},[locations])

  useEffect(() => {
    const count = countLocationMatch(option_locations, suggestion_params.locations)
    setLocationMatch(count)
  }, [locations, option_locations, suggestion_params.locations])

  useEffect(() => {
    (async () => {
      const params = { "want": want, "active": [...(active_options || [])] }
      try {
        const response = await getSuggestions(params);
        console.log(response)
        setOptions([...response.data.data.response])
      } catch (error) {
        console.log(error)
      }
    })()
  }, [active_options, locationMatch, want])

  const onClick = (option) => {
    let id;
    active[option.id] ? id = '' : id = option.id
    setActive({ ...active, [option.id]: id });
    onOptionSelect(want, option, option_locations);
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