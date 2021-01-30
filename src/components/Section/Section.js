import React, { useCallback, useContext, useEffect, useState } from "react";
import Line from "../Line";
import { Context } from "../../context/data.context";
import { mock } from "../mock-data";


const Section = () => {

  const { data } = useContext(Context)
  const structure = data.structure

  console.log('MAIN', data)
  
  return (
    
    <>
      { structure &&
        <div className='section'>
          <h1 className='section-label'>
            {structure.properties.name}
          </h1>
         {/*  <div><ul>{options.map(option => <li>{option}</li>)}</ul></div> */}
          <div className='container'>
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

// line has only one element?
// folder data da dolu olabilir mi mesela içinde text 
// come in order?
// on purpose 2 folder 2??
// section text de ekleniyor mu

// test?
// ilk text bağımsız değil mi?