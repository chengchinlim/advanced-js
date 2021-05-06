
const MyEventEmitter = require('./MyEventEmitter')

const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', async (req, res) => {
    const myEmitter = new MyEventEmitter()
    myEmitter.on('after-step-1', async data => {
        console.log(data)
        await myEmitter.step2()
    })
    myEmitter.on('after-step-2', async data => {
        console.log(data)
        await myEmitter.step3(req.query.skip)
    })
    myEmitter.on('after-step-3', data => {
        console.log(data)
        myEmitter.finishUp()
    })
    myEmitter.on('success', data => {
        console.log(data)
        res.status(200).send({
            message: data
        })
    })
    myEmitter.on('error', data => {
        console.error(data)
        res.status(500).send({
            error: data
        })
    })
    await myEmitter.step1()
    req.on('close', () => {
        myEmitter.removeAllListeners('after-step-1')
        myEmitter.removeAllListeners('after-step-2')
        myEmitter.removeAllListeners('after-step-3')
        myEmitter.removeAllListeners('success')
        myEmitter.removeAllListeners('error')
    })
})

// Start the server
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});