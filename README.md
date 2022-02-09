# Serverless S3 Lambda Notification with SQS

This project is an example implementing  the communication between S3 -> SQS -> Lambda
The the lambda gets triggered on every new object added to S3. An SQS has been configured in the middle to further imporve the scalability

![Blank diagram](https://user-images.githubusercontent.com/28974282/152189334-490b4540-f157-4a01-a9a7-f85e5b9f0bfa.png)


Running:

- Clone the repo
- Should have Node and Serverless installed
- Perform an NPM install
- Export your AWS creds like AccessKeyId, SecretAccessKey, and Region into your CLI - Make sure your keys have sufficient permissions
- run `sls deploy -s dev` and you're good to go
