#!/bin/sh

# Starts keystone on background and does not stop it when current shell is closed
nohup node keystone.js &
