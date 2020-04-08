//Function isempty(value){} this way also we can write

const isEmpty= value =>
//undefined in empty in JS.. here obj is like the errors in register page and keys refer to the data which goes inside that errors obj
value === undefined ||
value === null ||
(typeof value ==='object' && Object.keys(value).length === 0 ) ||
(typeof value === 'string' && value.trim().length === 0);

export default isEmpty;
