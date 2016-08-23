curr_dir=$(dirname "$(readlink -f "$0")")
# Load info variables
. $curr_dir/info.sh
# Gracefully stop the server
slc ctl soft-stop $APP_NAME
