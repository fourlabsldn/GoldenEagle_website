curr_dir=$(dirname "$(readlink -f "$0")")
# Load info variables
. $curr_dir/info.sh

# Start the application using StrongLoop process manager so
# that if our application crashes it is automatically restarted.
slc start &&
# Print the current state of the application execution
slc ctl &&
# Show the console output of the app live
slc ctl log-dump $APP_NAME --follow &&
echo "
  service_name: $APP_NAME
  Stop server: slc ctl shutdown
  Restart server: slc ctl soft-restart <service_name>
  List services: slc ctl ls"
