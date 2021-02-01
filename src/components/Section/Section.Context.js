import { createContext } from "react";

export const initial_data = {
    section: null,
    suggestion_params: {
        active_options: {
            section: []
        },
        locations: []
    }
}

export const SectionContext = createContext(initial_data);
