### So you have a NAT reflection problem. What now?
You've been directed here by someone from our Discord's Support group. Your symptoms seem to indicate that you have a NAT reflection problem: **your router is not forwarding requests from inside your LAN through your public-facing IP address**.

**This is normal.** You see, it's potentially a security risk to allow this traffic - it often indicates you have malware installed, or your network is improperly configured. Many routers silently `DROP` this traffic.

##### The good news is - your server is probably perfectly reachable from the Internet. Yay!
_Other people_  will be able to see and connect to it _just fine._

##### The bad news is - you won't be. And to make it worse, nobody except the router manufacturer can tell you how to fix this on _your particular device._ Sorry.

What you have to do is make sure your router redirects requests from _inside_  your LAN, returning back in via the WAN interface. Please **consult your device's manual** on how to set up NAT reflection (possibly also called "NAT loopback", "NAT hairpinning" etc.).

------------------------------------------
If you happen to be running `iptables` however, here's a line to get you started: 

`iptables -t nat -A PREROUTING -i ! YOUR-WAN-INTERFACE -s LAN-NETWORK -d PUBLIC-IP -p tcp --dport PORT -j DNAT --to-destination LAN-SERVER-ADDRES`
Explanation:
- `-i ! YOUR-WAN-INTERFACE` is there to make sure you don't accidentally include traffic from the Internet - the traffic we want to modify is handled within the router itself (and also, it never hurts to prevent spoofing)
- `-s LAN-NETWORK` defines your LAN's network pool - for example `-s 10.0.0.0/8` - this is to make sure you're only affecting traffic originating from your local LAN
- `-d PUBLIC-IP` line tells it to look for traffic that has a _destination_  of your public IP address
- `--dport PORT` is the port you wish to affect, and
- `--to-destination LAN-SERVER-ADDRESS` tells it to redirect all traffic that matches to your ATLAS server's LAN IP

So, to summarize, **"All traffic that comes in NOT via WAN but comes from LAN, and is destined for the PUBLIC IP and PORT, redirect to internal LAN IP of the server"**.

I hope this helps some.