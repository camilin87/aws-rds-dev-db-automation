# aws-rds-dev-db-automation
DevOps project to automate the creation of a fresh Clone from the production database with sanitized data   

## Setup  

- Create the following `DEV-DB-Creation` IAM policy with the following access  

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "elasticbeanstalk:*",
                "rds:*",
                "ec2:*"
            ],
            "Resource": "*"
        }
    ]
}
```

- Create an EC2 `DEV-DB-Creation` IAM role and attach the `DEV-DB-Creation` policy  

## Usage  

### Installation  

```bash
npm i -g aws-rds-dev-db-automation
```

### Generate the default configuration  

The first time the program runs it will write a default configuration to `./config.json`  

```bash
aws-rds-dev-db-automation
```

### Run the automation tasks  

Run the program once the configuration has been properly edited. The file [`defaultConfig.js`](lib/defaultConfig.js) contains all the possible parameters.  

```bash
aws-rds-dev-db-automation
```

## How does it work?  

This program runs multiple automation tasks. Each task can be enabled/disabled independently.  

1- Restore the most recent snapshot of an RDS instance. The application verifies the restored instance is ready for use before finishing.  

2- Change the master password of the newly created database. The application verifies the instance is ready for use before finishing.  

3- Sanitized the restored database. The application runs a list of configured scripts to delete sensitive production data.  

4- Delete old development databases created using the application. Only the most recent one is kept.  

5- Update an environment setting in an Elastic Beanstalk environment that contains connection string details to point to the most recent restored database.  

