export const Reducer = () => {
    return 'reduce'
}

export const formatNumber = (value, type) => {
    if(type === 'number'){
        return value.toFixed(2) 
    }
}