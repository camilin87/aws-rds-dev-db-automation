# Development  

## Prerequisites  

- Attach the `DEV-DB-Creation` policy to your IAM user  
- Create a set of IAM credentials  
- Configure the in the local `aws` cli under a `scorbot` profile  

This goes in `~/.aws/config`  

```
[profile scorbot]
region = us-east-1
output = json
```

This goes in `~/.aws/credentials`

```
[scorbot]
aws_access_key_id = AKIAAAAAAAAAAAAAAAA
aws_secret_access_key = SUPER_SECRET
```

- Use the correct AWS profile

```bash
export AWS_DEFAULT_PROFILE=scorbot && export AWS_PROFILE=scorbot
```

- Make sure the correct account is configured  

```bash
aws iam get-user
aws rds describe-db-instances
```
