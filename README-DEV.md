# Development  

## Docs  

https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/RDS.html
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ElasticBeanstalk.html

## Prerequisites  

- Attach the `DEV-DB-Creation` policy to your IAM user  
- Create a set of IAM credentials  
- Configure the in the local `aws` cli under a `aws_rds_dev_db` profile  

This goes in `~/.aws/config`  

```
[profile aws_rds_dev_db]
region = us-east-1
output = json
```

This goes in `~/.aws/credentials`

```
[aws_rds_dev_db]
aws_access_key_id = AKIAAAAAAAAAAAAAAAA
aws_secret_access_key = SUPER_SECRET
```

- Use the correct AWS profile

```bash
export AWS_DEFAULT_PROFILE=aws_rds_dev_db && export AWS_PROFILE=aws_rds_dev_db
```

- Make sure the correct account is configured  

```bash
aws iam get-user
aws rds describe-db-instances
```
