export const updateObjectInArray = (item: any, itemId: any, objPropName: any, newObjProps: any) => {
    return item.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}