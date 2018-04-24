const { promisify } = require('util')
const AWS = require('aws-sdk')
jest.mock('aws-sdk')
const lambda = require('./sfTrigger')
const handler = promisify(lambda.callStepFunction)

describe('Test sfTrigger function', () => {
    let stateMachineListPromise = jest.fn()
    let startExecutionPromise = jest.fn()

    const mockListStateMachines = jest.fn().mockImplementation(() => {
        return {promise: stateMachineListPromise}
    })

    const mockStartExecution = jest.fn().mockImplementation(() => {
        return {promise: startExecutionPromise}
    })

    // Mock stepfunctions constructer and provide mocks for methods called.
    AWS.StepFunctions = jest.fn().mockImplementation(() => {
        return {listStateMachines: mockListStateMachines,
                startExecution: mockStartExecution}
    })

    process.env['stepFunctionName'] = 'sf2'
    const event = {input: {stepFunctionInput: {resourceName: 'res1', auto: false}}}
    const context = {}

console.log(JSON.stringify({stepFunctionInput: {value: "4"}}))
    stateMachineListPromise.mockImplementationOnce(() => Promise.resolve(
        {stateMachines: [{name: 'sf1', stateMachineArn: 'arn1'}, {name: 'sf2', stateMachineArn: 'arn2'}]})
    )

    startExecutionPromise.mockImplementationOnce(() => Promise.resolve({arn: 'arn:statemachine', startTime: 1234}))
    
    it('successfully returns the stepfunction start message', () => {
        expect.assertions(2)
        return handler(event, context).then(
            result => {
              expect(result).toEqual({arn: 'arn:statemachine', startTime: 1234})
              expect(mockStartExecution).toHaveBeenCalledWith({input: JSON.stringify({resourceName: 'res1', auto: false}), stateMachineArn: 'arn2'})
        })
    })
})