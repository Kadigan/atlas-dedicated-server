# Example Redis DB configuration file

This is an example Redis configuration file. It should run as-is, but you may want to verify the first two lines (`bind` and `requirepassword`) to make sure it matches your configuration.

Comment-out the `bind` line if you wish the Redis server to bind to _all_  network interfaces instead of just `127.0.0.1` (this is important if you're running your Redis database on a machine not local to all of your **Shards**).

If this machine is on a different network entirely, remember to port-forward your Redis port (TCP).

### Usage
Drop the file into your Redis DB installation (backup the original first) and then restart the Redis service.

##### Restarting: Windows
Type `net stop redis` followed by `net start redis` into an elevated command prompt.

##### Restarting: Linux
For __systemd__ systems, `systemctl restart redis`. Otherwise, try `service redis restart` or consult the manual for your Linux distribution.