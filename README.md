# AIOT

![](deploy/image/AIOT-arch.png)

## 1. Folder Structure
```bash
.
├── AIOT_UX_web
├── README.md
├── code
│   ├── aiot_mqtt_device_emulator
│   ├── awsLambda
│   ├── backend
│   ├── dataPipeline
│   ├── demo
│   ├── frontend
│   └── nodeApp
├── deploy
└── ota
    └── documents
```
## 2. Deploy

### All in one
環境
- EC2
    - 4 vCPU
    - 15G memory
    - 100GB Disk

將 EC2 設定內部的 DNS 設定，可以避免環境變數使用 IP 時，變動 IP 後要換。
```shell
$ cat /etc/hosts
127.0.0.1 localhost
...
10.0.0.11  wizkloud.storage.net
```
使用 `docker-compose` 佈署，`docker` 環境設定

下面會限制，每個 container 產生的 log 大小，下面約束是 `300m`，如果有做修正需要執行 `sudo systemctl daemon-reload`
```shell
$ cat /etc/docker/daemon.json
{
  "ipv6": false,
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "300m",
    "max-file": "3",
    "labels": "wizkloud",
    "env": "prod"
  }
}
```


佈署資料夾結構

```shell
.
├── ca-certificates
│   ├── ca.crt
│   ├── ca.key
│   ├── cloudfront
│   ├── mqtt
│   ├── mqtt-bak
│   └── sftp
├── consumer
│   ├── Dockerfile
│   ├── config.template
│   ├── docker-compose.yml
│   ├── docker-entrypoint.sh
│   └── src
├── docker-compose-fe-be-web.yml
├── emqx
│   ├── ca.crt
│   ├── ca.key
│   ├── ca.srl
│   ├── cert
│   ├── client.crt
│   ├── client.csr
│   ├── client.key
│   ├── device.crt
│   ├── device.csr
│   ├── device.key
│   ├── docker-compose.yml
│   └── generate-CA.sh
├── eventTrigger
│   ├── Dockerfile
│   ├── cert
│   ├── config.template
│   ├── docker-compose.yml
│   ├── docker-entrypoint.sh
│   └── src
├── kafka
│   └── docker-compose.yml
├── mongodb
│   ├── config
│   ├── docker-compose-auth.yml
│   ├── docker-compose.yml
│   ├── init.sh
│   └── volume
├── nginx
│   ├── README.md
│   ├── cert
│   ├── nginx.conf
│   ├── notuse
│   └── sites-enabled
├── ota
│   ├── Dockerfile
│   ├── cert
│   ├── config.template
│   ├── docker-compose.yml
│   ├── docker-entrypoint.sh
│   └── src
├── postgres
│   └── init-db.sh
├── producer
│   ├── Dockerfile
│   ├── cert
│   ├── config.template
│   ├── docker-compose.yml
│   ├── docker-entrypoint.sh
│   └── src
└── storage-docker-compose.yaml
```

待補 datapipeline 流程...
```shell
$ docker-compose -f storage-docker-compose.yaml up -d
$ docker-compose -p wibase -f docker-compose-fe-be-web.yml up -d
```

>-p wibase 有設置的話盡量全部都設定否則服務可能會因為不同網路而不通，在 docker network 中會以該前綴當作網路名稱前綴

## Data pipeline 服務啟用
#### EMQX
1. 前端會透過 8084 與 EMQX 進行交互
2. Client 會使用 18883 與 EMQX 交互
3. Backend 會使用 8081(api)；18883(mqtts) 與 EMQX 交互
4. producer 使用 18883 與 EMQX 交互，18883 是 EMQX 從 8883 映射出來的 Port

在EMQX下會產生給Server、Client端或裝置端使用的憑證，用於驗證身分。使用emqx目錄下`generate-CA.sh`產生。依據EMQX Server設置環境變數`HOSTLIST`,`IPLIST`

1. EMQX server憑證
```shell
bash ./generate-CA.sh server
```
2. Client憑證
```shell
bash ./generate-CA.sh client {username}
```

將`ca.crt`,`server.key`,`srver.crt`移至docker-compose volume掛載之目錄(`./emqx/cert`)。
```
docker-compose -p wibase up -d
```
Dashboard連線資訊(admin/public):

`http://host:18083`
### Kafka
producer 和 consumer 會交互。

依據domain或IP調整kafka目錄下docker-compose.yml的環境變數`KAFKA_ADVERTISED_LISTENERS`
```
docker-compose -p wibase up -d
```
### MongoDB
- mongo_config
    - 存放資料的 Metadata
    - 記錄每一個資料存放的 Shard 位置使得 Router 可以正確 Query 資料
- mongo_shard
    - 放 Data 的地方
- mongo_router
    - 存取資料的路口點
- mongo_express
    - UI 介面
	
可調整mongo目錄下docker-compose.yml的mongo-express (UI介面) 的環境變數`ME_CONFIG_BASICAUTH_USERNAME`,`ME_CONFIG_BASICAUTH_PASSWORD`
```
docker-compose -p wibase up -d
```
Mongo-express連線資訊(default: admin/public):

`http:host:8080`

```
                                                        _______
                                                       |       |
                                              -------->| Shard |<-----
                                             /         |_______|      \
    ________               ________         /                          \         ________
   |        |             |        |       /                            \-----> |        |
   | Client | ------>     | Router | <----                                      | Config | 
   |________|             |________|       \                            ------> |________|
                            |             \          _______         /   |        
                            |              \        |       |       /    |
                            |               ------->| Shard | <-----     |
                            |                       |_______|            |
                            |                                            |
                             --------------------------------------------                        
```
## 其它微服務
### OTA Queue
使用emqx目錄下`generate-CA.sh`產生MQTT連線憑證
```
bash ./generate-CA.sh client ota
```
建立docker image
```
docker build -t ota_queue .
```
調整ota目錄下docker-compose.yml中 MQTT, DB相關環境變數，將`ota.crt`,`ota.key`,`ca.crt`放入`ota/cert`中
```
docker-compose -p wibase up -d
```

### Event Trigger 
使用emqx目錄下`generate-CA.sh`產生MQTT連線憑證
```
bash ./generate-CA.sh client eventTrigger
```
建立docker image
```
docker build -t event_trigger .
```
調整eventTrigger目錄下docker-compose.yml中 MQTT, DB相關環境變數，將`eventTrigger.crt`,`eventTrigger.key`,`ca.crt`放入`eventTrigger/cert`中
```
docker-compose -p wibase up -d
```
### Consumer
建立docker image
```
docker build -t kafka_sensor_consumer .
```
調整consumer目錄下docker-compose.yml中 DB相關環境變數
```
docker-compose -p wibase up -d
```
### Producer
使用emqx目錄下`generate-CA.sh`產生MQTT連線憑證
```
bash ./generate-CA.sh client producer
```
建立docker image
```
docker build -t kafka_sensor_producer .
```
調整producer目錄下docker-compose.yml中 MQTT, DB相關環境變數，將`producer.crt`,`producer.key`,`ca.crt`放入`producer/cert`中
```
docker-compose -p wibase up -d
```



## Portal 服務啟用
1. storage-docker-compose.yaml
   建立 `PostgreSql` 服務檔案，其初始檔案在 `postgres` 目錄下，用來初始化 database 和 user。`POSTGRES_USER` 和 `POSTGRES_DB` 是環境變數，會提供預設值
```shell
#!/bin/bash
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER kmuh WITH ENCRYPTED PASSWORD 'MR0A3032768';

    CREATE DATABASE wicc_kmuh
        WITH
        OWNER = kmuh
        ENCODING = 'UTF8'
        TABLESPACE = pg_default
        CONNECTION LIMIT = -1;


    ALTER USER kmuh WITH SUPERUSER;
    grant all privileges on database wicc_kmuh to kmuh;
EOSQL
```
2. docker-compose-fe-be-web.yml
   負責起前、後端服務和 nginx 反向代理。其中後端會掛載 `ca-certificates` 目錄至容器中，其內容都是憑證(MQTT、AWS 等服務)相關。在 `/deploy/ca-certificates/mqtt` 下的內容
```shell
ca.crt  ca.jks  ca.p12  client.crt  client.csr  client.key  client.pkcs12
```

`client.pkcs12` 檔案由以下產生
```shell
openssl pkcs12 -export -in client.crt -inkey client.key -out client.pkcs12
```

`ca.jks` 要由 `/deploy/emqx` 目錄下的 `ca.crt` 和 `ca.key` 產，並將其移動到 `/deploy/ca-certificates/mqtt`
```shell
openssl pkcs12 -export -in ca.crt -inkey ca.key -out ca.p12

keytool -importkeystore -srckeystore ca.p12 \
        -srcstoretype PKCS12 \
        -destkeystore ca.jks \
        -deststoretype JKS
```

## Nginx 配置
配置檔在 nginx 目錄下，`cert` 會放憑證相關檔案在將其掛載至 nginx 容器中。

下面是 `nginx.conf` 配置，通常是全域
```shell
$ cat nginx.conf
user www-data;
pid /run/nginx.pid;
worker_processes auto;
worker_rlimit_nofile 65535;

events {
        multi_accept on;
        worker_connections 65535;
}

http {
        charset utf-8;
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        server_tokens off;
        log_not_found off;
        types_hash_max_size 2048;
        client_max_body_size 10G;
        client_header_timeout 10m;
        client_body_timeout 10m;
        client_body_buffer_size 1M;
        client_header_buffer_size 10M;
        large_client_header_buffers 4 10M;

        # MIME
        include mime.types;
        default_type application/octet-stream;
        # 定義 Log 格式，未來串接 Log 相關應用可以獲取更多資訊
        log_format json escape=json '{ "time": "$time_iso8601", '
        '"category": "$sent_http_content_type", '
        '"remote_addr": "$remote_addr", '
        '"remote_user": "$remote_user", '
        '"src_ip": "$realip_remote_addr", '
        '"ssl_protocol_cipher": "$ssl_protocol/$ssl_cipher", '
        '"body_bytes_sent": "$body_bytes_sent", '
        '"request_time": "$request_time", '
        '"status": "$status", '
        '"request": "$request", '
        '"uri_query": "$query_string", '
        '"uri_path:: "$uri", '
        '"request_method": "$request_method", '
        '"http_referrer": "$http_referer", '
        '"http_x_forwarded_for": "$http_x_forwarded_for", '
        '"http_cf_ray": "$http_cf_ray", '
        '"host": "$host", '
        '"server_name": "$server_name", '
        '"upstream_address": "$upstream_addr", '
        '"upstream_status": "$upstream_status", '
        '"upstream_response_time": "$upstream_response_time", '
        '"upstream_response_length": "$upstream_response_length", '
        '"upstream_cache_status": "$upstream_cache_status", '
        '"http_user_agent": "$http_user_agent" }';

        # logging
        access_log /var/log/nginx/access.log json;
        error_log /var/log/nginx/error.log debug;

        # limits，限制 Client 請求
        limit_req_log_level warn;
        limit_req_zone $binary_remote_addr zone=login:10m rate=10r/m;

        # SSL 配置
        ssl_session_timeout 1d;
        ssl_session_cache shared:SSL:50m;
        ssl_session_tickets off;

        # modern configuration
        ssl_protocols TLSv1.2;
        ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256;
        ssl_prefer_server_ciphers on;

        # OCSP Stapling
        ssl_stapling on;
        ssl_stapling_verify on;
        resolver 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
        resolver_timeout 2s;

        # load configs
        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}

# 如果 EMQX 要做分流的話可以透過 nginx 的方式，下面的方式是針對 Layer 4 的協定
# emqx1 這個名字是 container 的名字，如果在同一個虛擬網路下是可以這樣做
#stream {
#  upstream stream_backend {
#      zone tcp_servers 64k;
#      hash $remote_addr;
#      server emqx1:1883 max_fails=2 fail_timeout=30s;
#      server emqx2:1883 max_fails=2 fail_timeout=30s;
#      server emqx3:1883 max_fails=2 fail_timeout=30s;
#  }

#  server {
#      listen 8883 ssl;
#      #status_zone tcp_server;
#      proxy_pass stream_backend;
#      proxy_buffer_size 4k;
#      ssl_handshake_timeout 15s;
#      ssl_certificate     /etc/nginx/ssl/certs/server.crt; # 自簽
#      ssl_certificate_key /etc/nginx/ssl/certs/server.key; # 自簽
#  }
#}
```

`sites-enabled` 目錄下的配置，主要是反向代理內容

下面是針對存取 EMQX 的 api 存取進行反向代理
```shell
$ cat sites-enabled/mqttapi.conf
upstream mqttapi {
      server emqx1:8081;
      server emqx2:8081;
      server emqx3:8081;
}

server {
    listen 8081;
    server_name wizkloud.storage.net;
    client_max_body_size 100M;

    location / {
        proxy_pass http://mqttapi;
    }
}
```
下面是針對 Web 服務，`proxy_pass` 設定的上游都是用 `container` 名稱，同樣需在同一個虛擬網路下。

請求架構，不含與 datapipeline 服務交互
```shell
                                        __________
                                       |          |
                                       | Frontend |
                                      /|__________|
 _________          _________        /
|         |        |         |      /
| Client  | <----->|  Nginx  | -----
|_________|        |_________|      \   __________         ____________
                                     \ |          |       |            |
                                      \| Backend  | ----->| PostgreSQL |
                                       |__________|       |____________|
```
```shell
$ cat sites-enabled/wicloud.conf
map $scheme $proxy_port {
    "http"  "80";
    "https" "443";
    default "80";
}

server {
       listen 80;
       server_name wicloudqt.biotrd.net;
       return 301 https://wizkloud.biotrd.net$request_uri; # 強轉 https
}
server {
    listen 443 ssl;
    server_name wizkloud.biotrd.net;
    ssl_certificate /etc/nginx/ssl/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/certs/privkey.pem;
    ssl_trusted_certificate /etc/nginx/ssl/certs/fullchain.pem;

#    add_header X-Frame-Options "SAMEORIGIN" always;
#    add_header X-XSS-Protection "1; mode=block" always;
#    add_header X-Content-Type-Options "nosniff" always;

    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src * data: 'unsafe-eval' 'unsafe-inline' blob:; media-src 'self' blob: https://d3vpnnbpw3erjv.cloudfront.net" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Permissions-Policy "geolocation=(self),camera=(self),speaker=(self)";


#    add_header  Set-Cookie "HttpOnly";
#    add_header  Set-Cookie "Secure";

    #CORS
#    add_header 'Access-Control-Allow-Origin' $http_origin;
#    add_header 'Access-Control-Allow-Methods' 'GET,POST,DELETE,PUT,OPTIONS';
#    add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type, X-Codingpedia, requesttype, accept, access-control-allow-headers, authorization';
#    add_header 'Access-Control-Allow-Credentials' 'true';


    client_max_body_size 10G; # 上傳檔案大小限制，預設很小
    send_timeout                605s;
    keepalive_timeout           605s;

    location / {
      proxy_pass http://frontend/;
      proxy_connect_timeout 60s;
      proxy_read_timeout 60s;
      proxy_send_timeout 60s;
      proxy_set_header   Host             $host:$proxy_port;
      proxy_set_header   X-Real-IP        $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header Via    "nginx";
    }

    location ^~ /api/ {
      proxy_pass http://backend:8080/;
      proxy_connect_timeout 600s;
      proxy_read_timeout 600s;
      proxy_send_timeout 600s;
      proxy_set_header   Host             $host:$proxy_port;
      proxy_set_header   X-Real-IP        $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Proto $scheme;
#      proxy_set_header   X-Forwarded-Prefix /api;
      proxy_set_header Via    "nginx";
    }

}
```



[comment]: <> (VM init se)

[comment]: <> (- [VM init setup]&#40;deploy/Setup.md&#41;)

[comment]: <> (- [Deploy]&#40;deploy/Deploy.md&#41;)

[comment]: <> (<!-- - [HAProxy build and setup]&#40;docker/haproxy/README.md&#41; -->)

[comment]: <> (<!-- - [Database setup]&#40;database/README.md&#41; -->)

[comment]: <> (<!-- - [Database failover steps]&#40;database/failover_steps.md&#41; -->)

# Stream Server參考文件
## Openvidu 參考文件
[1. Deployment](https://docs.openvidu.io/en/stable/deployment/)

[2. Openvidu Native REST API](https://docs.openvidu.io/en/stable/reference-docs/REST-API/) 可以直接透過API操控Openvidu

[3. CDR/Webhook](https://docs.openvidu.io/en/stable/reference-docs/openvidu-server-cdr/)

[4. POSTMAN](Document/OpenVidu.postman_collection.json) 下載2.REST API的POSTMAN

[5. Backend API](https://hackmd.io/AFiqLfihQIaX9bTnK4bm7w?view#Streaming-Server-API) 後端API文件
## RTSP-Simple-Server 
>Load Balance
![](Document/loadbalance.png)

>rtsp to webrtc
![](Document/webrtc-streamer.png)

詳細說明及架構請見下列連結hackmd

[1. Installation](https://hackmd.io/AFiqLfihQIaX9bTnK4bm7w?view#RTSPS-Simple-Server-Installation)

[2. API](https://hackmd.io/AFiqLfihQIaX9bTnK4bm7w?view#RTSP-Simple-Server-API) (包含backend api+ native api集合說明)

[3. Github POSTMAN](https://aler9.github.io/rtsp-simple-server/)

### webrtc-streamer

[Html/JS Sample for webrtc-streamer](./Document/WebRtcStreamer.zip)
```html
<html>
<head>
<script src="./js/adapter.min.js" ></script>
<script src="./js/webrtcstreamer.js" ></script>
<style>
video {
	audio::-webkit-media-controls-timeline,
	video::-webkit-media-controls-timeline {
		display: none;
	}
	audio::-webkit-media-controls,
	video::-webkit-media-controls {
		display: none;
	}
}
</style>
<script>        
    var webRtcServer      = null;
    window.onload         = function() { 
		webRtcServer      = new WebRtcStreamer("video", "http://10.31.104.35:8000");
		webRtcServer.connect("rtsp://10.31.104.33:8554/test1", null, "rtptransport=tcp&timeout=60");
	}
    window.onbeforeunload = function() { webRtcServer.disconnect(); }
</script>
</head>
<body> 
    <video id="video" autoplay muted controls/>
</body>
</html>
```
