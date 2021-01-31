const mapChildElements = (item, structure) => {
    let data;

    data = item.data.map((children_id) => {
        const children = structure.find((item) => item.id === children_id);
        if (children.data[0]) {
            return mapChildElements(children, structure);
        } else {
            return children;
        }
    });
    
    return {
        ...item,
        data
    };
};

export { mapChildElements }
