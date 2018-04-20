/** Trigger step function from lambda. */
//TODO decide what event data is passed in (just pass through or make sure key for sf input.)
const AWS = require('aws-sdk')

module.exports.sfTrigger = function (event, context) {
    console.log('sfTrigger, data in: ', event)
    const stateMachineName = process.env.STEP_FUNCTION_NAME;
    const stepfunctions = new AWS.StepFunctions();

    console.log('Fetching the list of available workflows');

    stepfunctions.listStateMachines().promise().then(data => {
        console.log('Searching for the step function', data);
        for (var i = 0; i < data.stateMachines.length; i++) {
            const item = data.stateMachines[i];
            if (item.name === stateMachineName) {
                console.log('Found the step function', item);
                return item.stateMachineArn
            }
        }

        throw 'Step function with the given name doesn\'t exist'
    }).then(stateMachineArn => {
        console.log('Executing the step function', stateMachineArn);
        return stepfunctions.startExecution({
            stateMachineArn: stateMachineArn,
            input: JSON.stringify({ key: 'somevalue' })
        }).promise()
    }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err)
    })
  }
