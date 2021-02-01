import * as actions from './actions'

const SectionReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_DATA: {
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
        case actions.ADD_ACTIVE_OPTION: {
            const { want, option, option_locations } = action.payload;
            const { id, name } = option;
            const selectedOption = {
                data: [''],
                id,
                original: { id, name },
                properties: { name },
                type: 'text'
            }
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
                    },
                    locations: [...option_locations]
                },
                selected_options: {
                    ...state.selected_options,
                    [want]: [...(state.selected_options[want] || []), selectedOption]
                }

            }
        }
        case actions.REMOVE_ACTIVE_OPTION: {
            const { option, want } = action.payload;
            const { id } = option;
            const section = state.suggestion_params.active_options.section.filter(item => item !== id)
            const folders = state.suggestion_params.active_options[want].filter(item => item !== id)
            const selections = state.selected_options[want].filter(item => item.id !== id)

            return {
                ...state,
                suggestion_params: {
                    ...state.suggestion_params,
                    active_options: {
                        ...state.suggestion_params.active_options,
                        section: [...section],
                        [want]: [...folders]
                    },
                    locations: []
                },
                selected_options: {
                    ...state.selected_options,
                    [want]: [...selections]
                }
            }
        }
        default:
            break;
    }
}

export default SectionReducer;