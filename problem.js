
function problem1(number) {
let sum=0
for(let i=0; i<=number;i++){
sum +=i
}
return sum
}
// console.log(problem1(4));

function problem2(hours) {
    return hours *60 *60
    
}
// console.log(problem2(24));

function problem3(arr) {
    
let sum=""
for (let i = 0; i < arr.length; i++) {

    sum=sum+`${arr[i]}`
}

 return  sum
}
// console.log(problem3([11,51,76]));

function upsideFun(arr) {
    let counter=0

    for (let i = 0; i < arr.length; i++) {
   if (arr[i-1] === arr[i+1] && arr[i+1] !==arr[i]) {
    counter= counter+1
   }
    }

    return counter
}
// console.log(upsideFun([1, 7, 1, 7, 1, 7, 1]));

// function oddishOrEvenish(number) {
//     let elements=number.toString().split('')
//     let sum=0
// for (let i = 0; i < elements.length; i++) {
  
//     sum=sum+Number(elements[i]) 
// }
// if (sum %2 ===0) {
//   return "evenish"
// }else{
//   return "odish"

// }
// let test=number*1
//  return typeof test
// }
// console.log(oddishOrEvenish("442"));

function oddishOrEvenish(num) {
	return [...String(num)].reduce((a,v) => a*1 + v*1) % 2 ? 'Oddish' : 'Evenish'
}
// console.log(oddishOrEvenish("471"));

function getDays(day1,day2) {
    let yearsForYear1=day1.getYear()+1900
    console.log(day1);
    // let yearsForYear2=Number(day2.slice(0,4))

    console.log(yearsForYear1 );
    // console.log(yearsForYear2);

}

getDays(new Date("June 14,1953"))