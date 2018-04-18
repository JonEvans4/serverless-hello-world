const { promisify } = require('util');
const lambda = require('./handler')

const handler = promisify(lambda.helloWorld);

describe('Test lambda function', () => {
    const event = {value: 2}
    const context = {}

    it('successfully returns a message', () => {
        expect.assertions(1)
        return handler(event, context).then(
            result => {
              expect(result.statusCode).toEqual(200)
        })
    })
})