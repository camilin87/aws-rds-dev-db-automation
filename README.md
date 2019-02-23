# scorbot-dev-db-automation
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

```bash
npm run default-config
```
