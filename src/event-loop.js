
const fs = require('fs')

// below are learnings for event loop
// poll -> check -> close -> timers -> pending

// setImmediate -> Callback executed in the next iteration of event loop

// console.log('Question 1')
//
// setImmediate(() => { console.log(1) })
// Promise.resolve().then(() => console.log(2))
// process.nextTick(() => console.log(3))
// fs.readFile(__filename, () => {
//     console.log(4)
//     setTimeout(() => console.log(5))
//     setImmediate(() => { console.log(6) })
//     process.nextTick(() => console.log(7))
// })
// console.log(8)

// What I think before looking at the solution
// 8, 1, 3, 2, 4, 6, 5, 7

// Solution
// 8, 3, 2 (poll)
// 1 (check)
// 4, 7 (poll)
// 6, 5 (check)
// 8, 3, 2, 1, 4, 7, 6, 5

console.log('Question 2')

setImmediate(() => { console.log(1) })
console.log(2)
Promise.resolve().then(() => setTimeout(() => {
    setImmediate(() => console.log(3))
    console.log(4)
    Promise.resolve().then(() => setImmediate(() => {
        setImmediate(() => console.log(5))
        console.log(6)
        Promise.resolve().then(() => {
            setImmediate(() => console.log(7))
            console.log(8)
        })
    }, 0))
}))

// What I think before looking at the solution
// 2, 1, 4, 3, 6, 5, 8, 7

// Solution
// 2, 1, 4, 3, 6, 8, 5, 7