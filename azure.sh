#README
#Commands commented bellow is unnecessary in case this script if schood-cloud/azure.sh was runned before
#just need pass here the correct resource group name and and webapp name


USER=$4
PASSWORD=$5
WEBAPP_NAME=$1
WEBAPP_SECONDNAME=$2
SERVICEPLAN_NAME=$3
RESOURCEGROUP_NAME=$3
#LOCATION_GROUP=${6:-brazilsouth} #If variable not set, set it to default.


az login -u $USER -p $PASSWORD

#next line unnecessary in case this app point to other resource group
#az group create --location $LOCATION_GROUP --name $RESOURCEGROUP_NAME-group

#next line unnecessary if is only one service plan for all apps or if this app point to same resource group of another app
#az appservice plan create --name $SERVICEPLAN_NAME-service-plan --resource-group $RESOURCEGROUP_NAME-group --sku B2  > service-$WEBAPP_NAME-$WEBAPP_SECONDNAME.json


az webapp create --name $WEBAPP_NAME-$WEBAPP_SECONDNAME --resource-group $RESOURCEGROUP_NAME-group --plan $SERVICEPLAN_NAME-service-plan > webapp-$WEBAPP_NAME-$WEBAPP_SECONDNAME.json
az webapp config set \
--name $WEBAPP_NAME-$WEBAPP_SECONDNAME \
--resource-group $RESOURCEGROUP_NAME-group \
--java-container TOMCAT \
--java-version 1.8.0_73  \
--java-container-version 8.5


az webapp deployment list-publishing-profiles  \
--name $WEBAPP_NAME-$WEBAPP_SECONDNAME \
--resource-group $RESOURCEGROUP_NAME-group  \
--query "[?publishMethod=='FTP'].{URL:publishUrl, Username:userName,Password:userPWD}"  > credentials-$WEBAPP_SECONDNAME.json

az webapp config appsettings set --settings SPRING_PROFILES_ACTIVE=prod --resource-group $RESOURCEGROUP_NAME-group --name $WEBAPP_NAME-$WEBAPP_SECONDNAME
az webapp config appsettings set \
--settings SPRING_DATASOURCE_URL="jdbc:postgresql://smartcampusdev01adb.postgres.database.azure.com:5432/positivo-cloud" \
--resource-group $RESOURCEGROUP_NAME-group --name $WEBAPP_NAME-$WEBAPP_SECONDNAME
az webapp config appsettings set --settings SPRING_DATASOURCE_USERNAME=smartcampus@smartcampusdev01adb --resource-group $RESOURCEGROUP_NAME-group --name $WEBAPP_NAME-$WEBAPP_SECONDNAME
az webapp config appsettings set --settings SPRING_DATASOURCE_PASSWORD=22veN5dmLvfxOghrsPbjJ1nmNWI1jf3quOGITyZZyjhRYJx --resource-group $RESOURCEGROUP_NAME-group --name $WEBAPP_NAME-$WEBAPP_SECONDNAME

az webapp config appsettings set --settings JHIPSTER_SECURITY_CLIENT_AUTHORIZATION_ACCESS_TOKEN_URI=https://uaa-$WEBAPP_SECONDNAME.azurewebsites.net/oauth/token --resource-group $RESOURCEGROUP_NAME-group --name $WEBAPP_NAME-$WEBAPP_SECONDNAME
az webapp config appsettings set --settings OAUTH2_SIGNATURE_VERIFICATION_PUBLIC_KEY_ENDPOINT_URI=https://uaa-$WEBAPP_SECONDNAME.azurewebsites.net/oauth/token_key --resource-group $RESOURCEGROUP_NAME-group --name $WEBAPP_NAME-$WEBAPP_SECONDNAME
az webapp config appsettings set --settings SECURITY_OAUTH2_CLIENT_ACCESSTOKENURI=https://uaa-$WEBAPP_SECONDNAME.azurewebsites.net/oauth/token --resource-group $RESOURCEGROUP_NAME-group --name $WEBAPP_NAME-$WEBAPP_SECONDNAME
az webapp config appsettings set --settings SECURITY_OAUTH2_CLIENT_USERAUTHORIZATIONURI=https://uaa-$WEBAPP_SECONDNAME.azurewebsites.net/oauth/authorize --resource-group $RESOURCEGROUP_NAME-group --name $WEBAPP_NAME-$WEBAPP_SECONDNAME
az webapp config appsettings set --settings SECURITY_OAUTH2_RESOURCE_USERINFOURI=https://uaa-$WEBAPP_SECONDNAME.azurewebsites.net/api/account --resource-group $RESOURCEGROUP_NAME-group --name $WEBAPP_NAME-$WEBAPP_SECONDNAME
az webapp config appsettings set --settings SECURITY_OAUTH2_RESOURCE_URIBASE=https://uaa-$WEBAPP_SECONDNAME.azurewebsites.net --resource-group $RESOURCEGROUP_NAME-group --name $WEBAPP_NAME-$WEBAPP_SECONDNAME

gradle deploy -Pprod


#az group delete --name $RESOURCEGROUP_NAME-group
