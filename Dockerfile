##########################
###### Server Build ######
##########################
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS backend

WORKDIR /app/Server

COPY Server/*.sln ./
COPY Server/*.csproj ./
RUN dotnet restore

COPY Server/* ./

RUN dotnet publish -c release --no-restore

##########################
###### Client Build ######
##########################
FROM node:lts as frontend

WORKDIR /app/Client

COPY Client/package.json ./
COPY Client/package-lock.json ./

RUN npm i

COPY Client/* ./
COPY --from=backend /app/Client/src/models/* ./src/models/

RUN npm run build

##########################
###### Final Build #######
##########################
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=backend /app/Server/bin/Release/net6.0/publish/* ./
COPY --from=frontend /app/Client/dist/* ./front/
ENTRYPOINT ["dotnet", "Server.dll"]