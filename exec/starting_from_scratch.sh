#!/bin/sh

sh node_install_all.sh
cd exec
sh bower_install_all.sh
cd exec
sh gulp_compile.sh
