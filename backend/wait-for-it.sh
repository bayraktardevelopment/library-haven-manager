#!/bin/bash

host="$1"
shift
cmd="$@"

until mysqladmin ping -h "$host" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" --silent; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"
exec $cmd