
const EventEmitter = require('events').EventEmitter

class MyEventEmitter extends EventEmitter {

    async step1() {
        const result = await new Promise(resolve => {
            setTimeout(() => {
                console.log('Doing step 1')
                resolve('finish-step-1')
            }, 1000)
        })
        this.emit('after-step-1', result)
    }

    async step2() {
        const result = await new Promise(resolve => {
            setTimeout(() => {
                console.log('Doing step 2')
                resolve('finish-step-2')
            }, 1000)
        })
        this.emit('after-step-2', result)
    }

    async step3(skip) {
        if (skip) {
            return this.finishUp()
        }
        const result = await new Promise(resolve => {
            setTimeout(() => {
                console.log('Doing step 3')
                resolve('finish-step-3')
            }, 1000)
        })
        this.emit('after-step-3', result)
    }

    finishUp() {
        this.emit('success', 'close-connection')
    }
}

module.exports =  MyEventEmitter
