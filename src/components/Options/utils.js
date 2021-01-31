const countLocationMatch = (option_locations, suggestions_params) => {
    const optionsMap = new Map();
    const paramsMap = new Map();

    option_locations.forEach((item) => {
        optionsMap.set(item, item);
    });

    suggestions_params.forEach((item) => {
        paramsMap.set(item, item);
    });

    const match = [];

    for (const [key] of optionsMap.entries()) {
        if (paramsMap.has(key)) {
            match.push(key);
        }
    }


    return match.length > 0 ? 1 : 0;
};

export { countLocationMatch }