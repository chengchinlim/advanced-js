
setTimeout(() => console.log('A'), 0)
console.log('B')
setTimeout(() => console.log('C'), 100) // timeout ms = as early as
setTimeout(() => console.log('D'), 0)
let i = 0;
while (i < 1_000_000) { // Assume this takes 500ms
    let ignore = Math.sqrt(i)
    i++;
}
console.log('E')

// What I think before looking at the solution
// B, E, A, D, C
// 1, 500, 501, 502, 600

// Solution
// B, E, A, D, C
// 1, 500, 501, 502, 502