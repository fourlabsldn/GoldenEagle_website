curr_dir=$(dirname "$(readlink -f "$0")")
# Load info variables
. $curr_dir/info.sh
# Gracefully restart
slc ctl soft-restart $APP_NAME
