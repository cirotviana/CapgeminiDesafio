

export const reverseString = (str: string) : string => {
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}


export const convertDateString = (str: string) : string => {
    const strs = str.split('/')
    return `${strs[2]}/${strs[1]}/${strs[0]}`;
}


