

export function getCount(str) {
    // return str.split('').filter(e => e === 'a' || e === "e" || e === 'i' || e === 'o' || e === 'u' ? e : '').length
    return str.split('').filter(e => 'aeieou'.includes(e)).length
}

console.log(getCount("abracadabra"))