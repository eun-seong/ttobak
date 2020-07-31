# Audio Processing Server for 또박이

This is the document for how to install and run audio processing server for **또박이**

The server contains **Nginx** and **NodeJS**

I hope you read **README.md** at parent directory

## Installation

### Requirements
---

* LTS version Linux (I tested in 18.04)
* Enough storage more than 100GB
* Proper CPU and RAM
* **Kaldi** and **Zeroth** (If you want more information, go read **README.md** at parent directory

### Install Nginx
---

```
sudo apt-get update;
sudo apt-get install nginx;
```

I use nginx as a proxy server   
Check out the server is running   
Just put your ip address on your web browser   

**Note**
If you cannot access to the server, execute `sudo service nginx start`

### Install Node

First, you should install **nvm**   

```
sudo wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

Just restart the terminal   

And then, you should install **node**   

```
nvm use v12.18.3
```

Check node, npm, nvm is well installed by using `node`, `npm`, `nvm`   

Here's the version what I installed:   

* Node version : 12.18.3   
* Npm version : 6.14.7   
* Nvm version : 0.33.11   

Run `node app.js` in server directory, and type "ip_address":8080 on your web browser   

### Proxy Setting
---

```
cd /etc/nginx/sites-available
sudo vi node-server
```

Edit proxy settings

```
server {
    listen 8000;
    location / {
        proxy_pass http://127.0.0.1:8080;
    }
}
```

Link file to `/etc/nginx/sites-enabled`

```
sudo ln -s /etc/nginx/sites-available/node-server /etc/nginx/sites-enabled/
```

Restart nginx server

```
sudo service nginx restart
```

Start nodejs server

```
node app.js
```

