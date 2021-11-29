# NFT Battles - Front

## Requisites

Before running this make sure you have the [nft-battles-server](https://github.com/eum602/rmrk-battles-socket-server) running on port 4001

## Build with docker

```shell
docker build -t nft-battles-front:v01 .
```

## Run with docker

```shel
docker run -p 80:80 --network=host nft-battles-front:v01
```
