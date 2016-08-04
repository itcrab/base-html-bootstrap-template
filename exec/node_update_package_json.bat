cd ..
call npm install npm-check-updates
call node_modules\.bin\ncu.cmd -u
call npm uninstall npm-check-updates
cd exec
