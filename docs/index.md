# Basic structure of MTA

Welcome to MTA, an Mail-Transfer-Agent by [selfmail](https://selfmail.app). It's customizable, has a great graphical user interface and runs on your own servers. You can get started with the free version by just running our installation script.

### Installation
You need an server with an open port 25 as well as 587. If you want to use a VPS at Hetzner, you have to request access to these two ports, they are blocked due to spam abuses. 

If you have a firewall on your server, you have to open port 25 and 587 in order for the MTA to work.

If you're VPS is set up, you can quickstart with the official MTA installation script:
```sh 
sudo run mta
```
