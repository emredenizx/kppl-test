const SectionReducer = (state, action) => {
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
            const { id, want, locations } = action.payload;
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
                    locations: [...locations]
                },
            }
        }
        case 'REMOVE_ACTIVE_OPTION': {
            const { id, want } = action.payload;
            const section = state.suggestion_params.active_options.section.filter(item => item !== id)
            const folders = state.suggestion_params.active_options[want].filter(item => item !== id)
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
            }
        }
        default:
            break;
    }
}

export default SectionReducer;