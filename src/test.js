function getCount(str) {
    // return str.split('').filter(e => e === 'a' || e === "e" || e === 'i' || e === 'o' || e === 'u' ? e : '').length
    return str.split('').filter(e => 'aeieou'.includes(e)).length
}

//console.log(getCount("abracadabra"))

// const Test = require('@codewars/test-compat');

// describe("doubleChar", function() {
//     it("works for some examples", function() {
//         Test.assertEquals(doubleChar("abcd"), "aabbccdd");
//         Test.assertEquals(doubleChar("Adidas"), "AAddiiddaass");
//         Test.assertEquals(doubleChar("1337"), "11333377");
//         Test.assertEquals(doubleChar("illuminati"), "iilllluummiinnaattii");
//         Test.assertEquals(doubleChar("123456"), "112233445566");
//         Test.assertEquals(doubleChar("%^&*("), "%%^^&&**((");
//     });
// });

function doubleChar(str) {
    return str.split('').map(e => e + e).join('');
}

//console.log(doubleChar("Yury"))

const booleanToString = (b) => b.toString();
//console.log(booleanToString(true))
//console.log(typeof booleanToString(true))


/*Given an array (arr) as an argument complete the function countSmileys that should return the total number of smiling faces.

Rules for a smiling face:

Each smiley face must contain a valid pair of eyes. Eyes can be marked as : or ;
A smiley face can have a nose but it does not have to. Valid characters for a nose are - or ~
Every smiling face must have a smiling mouth that should be marked with either ) or D
No additional characters are allowed except for those mentioned.

Valid smiley face examples: :) :D ;-D :~)
Invalid smiley faces: ;( :> :} :]

Example
countSmileys([':)', ';(', ';}', ':-D']);       // should return 2;
countSmileys([';D', ':-(', ':-)', ';~)']);     // should return 3;
countSmileys([';]', ':[', ';*', ':$', ';-D']); // should return 1;*/


function countSmileys(arr) {
    const eyes = ':' || ';'
    const nose = '-' || '~'
    const mouth = ')' || 'D'

    return arr.filter(e =>  e.includes(mouth))
}

console.log(countSmileys([':D',':~)',';~D',':)']))

