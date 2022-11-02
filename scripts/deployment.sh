export STAGE=dev
export AWS_PROFILE=idemia-developer
export AWS_REGION=us-east-1

function ui-deploy {
    sls deploy --stage ${STAGE}
}

function ui-remove {
    sls remove --stage ${STAGE}
}

function ui-s3-sync {
    aws s3 sync ./dist/reservation-ui/ s3://reservation-ui-${STAGE}/ 
}

function ui-s3-remove {
    aws s3 rm s3://reservation-ui-${STAGE}/ --recursive 
}

function ctest {
    ng test --include=$1 --no-watch --code-coverage
}

function test {
    ng test --include=$1
}
