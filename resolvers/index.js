const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const sqs = new AWS.SQS()

const log = (str, data) => {
  console.log(str, JSON.stringify(data))
}

module.exports.testLambda = async (event) => {
  console.log('Event Received', JSON.stringify(event))
  await uploadToS3(event)
  return true
}

async function uploadToS3 (data) {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: 'testKey.json',
    Body: JSON.stringify(data)
  }
  console.log('paramss', JSON.stringify(params))
  await s3.upload(params).promise().catch(err => {
    console.log('Err in upload', err)
  })
  return true
}

module.exports.pushToSQS = async (event) => {
  log('Event', event)
  await pushToQueue(event)
  return true
}

module.exports.receiveFromSQS = async (event) => {
  log('Event', event)
  throw new Error('Manual Error')
}

module.exports.consumeFromDLQ = async (event) => {
  log('Event', event)
  return true
}

async function pushToQueue (data) {
  const params = {
    MessageBody: JSON.stringify(data),
    QueueUrl: process.env.SQS
  }
  const response = await sqs.sendMessage(params).promise().catch(err => {
    log('Err while pushing to SQS', err)
  })
  log('SQS push response', response)
  return response
}
