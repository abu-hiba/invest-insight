export const parseQueryString= (queryString: string): Record<string, string> => {
    const queryObject: Record<string, string> = {}
    queryString.split('?')[1].split('&').map(q => {
        const [param, val] = q.split('=')
        queryObject[param] = val
    })
    return queryObject
} 