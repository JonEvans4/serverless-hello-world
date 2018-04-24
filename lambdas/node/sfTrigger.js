/** Trigger step function from lambda. */
const AWS = require('aws-sdk')

module.exports.callStepFunction = function (event, context, callback) {
    console.log('event ', event)
    const stateMachineName = process.env.stepFunctionName
    const stepfunctions = new AWS.StepFunctions();

    stepfunctions.listStateMachines().promise().then(data => {
        for (var i = 0; i < data.stateMachines.length; i++) {
            const item = data.stateMachines[i];
            if (item.name === stateMachineName) {
                return item.stateMachineArn
            }
        }

        throw 'Step function with the given name does not exist'
    }).then(stateMachineArn => {
        return stepfunctions.startExecution({
            stateMachineArn: stateMachineArn,
            input: JSON.stringify(event.input.stepFunctionInput)
        }).promise()
    }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err)
    })
  }
