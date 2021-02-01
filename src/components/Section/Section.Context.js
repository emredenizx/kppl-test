import { createContext } from "react";

export const initial_data = {
    section: [],
    suggestion_params: {
        active_options: {
            section: []
        },
        locations: []
    },
    selected_options: {}
}

export const SectionContext = createContext(initial_data);
