const AWS = require('aws-sdk');

exports.handler = async function(event, context, callback) {
    const EC2 = new AWS.EC2();
    const S3 = new AWS.S3();

    try {
        // Get some info about all instances.
        const instancesData = await EC2.describeInstances().promise();

        // Get instance IDs.
        const instanceIds = [];
        instancesData.Reservations.forEach(reservation => {
            reservation.Instances.forEach(instance => {
                instanceIds.push(instance.InstanceId);
            });
        });

        // Iterate through each instance ID.
        for (instanceId of instanceIds) {
            // Create an S3 bucket.
            await S3.createBucket({ Bucket: instanceId }).promise();

            // Put an object into the newly created bucket.
            await S3.putObject({ Bucket: bucketId, Key: 'hello.txt', Body: 'Hello world!' }).promise();
        }

        callback(null, 'Success!');
    } catch (err) {
        callback(err.message);
    }
};
