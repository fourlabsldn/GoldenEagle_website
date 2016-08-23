# Set script to exit on any error
set -e
# Load package.json
PACKAGE_JSON=$(cat package.json)

# Get package name
APP_NAME=$(node -pe 'JSON.parse(process.argv[1]).name' "$PACKAGE_JSON")
