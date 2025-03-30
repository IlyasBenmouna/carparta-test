cd ../backend && node server.js &
BACKEND_PID=$!
cd ../frontend

/Users/ilyas.benmouna/.nvm/versions/node/v20.12.1/bin/npm run dev &
FRONTEND_PID=$!

wait $BACKEND_PID $FRONTEND_PID