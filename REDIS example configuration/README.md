# Example Redis DB configuration file

This is an example Redis configuration file. It should run as-is, but you may want to verify the first two lines (`bind` and `requirepassword`) to make sure it matches your configuration.

Comment-out the `bind` line if you wish the Redis server to bind to _all_  network interfaces instead of just `127.0.0.1` (this is important if you're running your Redis database on a machine not local to all of your **Shards**).

If this machine is on a different network entirely, remember to port-forward your Redis port (TCP).

### Getting the Redis
It is advised _not to use the bundled Redis DB_  as you will lose your config file each time it's updated. Please fetch a Redis server for Windows from [this Microsoft Archive repository on GitHub](https://github.com/MicrosoftArchive/redis/releases/) (version 3.2.100 is _confirmed to work_  with ATLAS DS).

Under Linux, you probably need to just run your favourite package manager to get a copy.

### Usage
Drop the file into your Redis DB installation (backup the original first) and then restart the Redis service.

##### Restarting: Windows
Type `net stop redis` followed by `net start redis` into an elevated command prompt.

##### Restarting: Linux
For __systemd__ systems, `systemctl restart redis`. Otherwise, try `service redis restart` or consult the manual for your Linux distribution.