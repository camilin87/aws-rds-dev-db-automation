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
