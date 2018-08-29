export const groupBy = (objectArray, property) => {
    return [...objectArray.reduce((r, o) => {
        const key = o[property];

        const item = r.get(key) || Object.assign({}, {'name': o[property]}, {
            books: []
        });

        item.books.push(o);

        return r.set(key, item);
    }, new Map()).values()];
}
