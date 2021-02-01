import React, { useContext } from 'react';
import Element from '../Element'
import Options from '../../Options'
import { SectionContext } from '../../Section/Section.Context'

const Folder = ({ ...props }) => {

    const { type, properties, original, data } = props;
    const { selected_options } = useContext(SectionContext)

    return (
        <div className={type}>
            <p className='label'>{properties.name}</p>
            {original.want &&
                <div className='options'>
                    <Options
                        type={type}
                        locations={properties.locations}
                        {...original} />
                </div>
            }
            {selected_options[original.want] &&
                selected_options[original.want].map(option =>
                    <Element key={option.id} {...option} />
                )}
            {data[0] && data.map(item => <Element key={item.id} {...item} />)}
        </div>
    );
}

export default Folder;