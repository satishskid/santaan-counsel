#!/bin/bash

echo "🧹 Killing any existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:5175 | xargs kill -9 2>/dev/null
sleep 2

echo "🚀 Starting backend on port 3000..."
cd backend
CORS_ORIGIN=http://localhost:5175 nohup npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo "⏳ Waiting for backend..."
sleep 5

if curl -s http://localhost:3000/health > /dev/null; then
  echo "✅ Backend running on port 3000 (PID: $BACKEND_PID)"
else
  echo "❌ Backend failed to start"
  exit 1
fi

echo "🚀 Starting frontend on port 5175..."
cd frontend
nohup npm run dev -- --port 5175 > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "⏳ Waiting for frontend..."
sleep 5

if curl -s http://localhost:5175 > /dev/null; then
  echo "✅ Frontend running on port 5175 (PID: $FRONTEND_PID)"
else
  echo "❌ Frontend failed to start"
  exit 1
fi

echo ""
echo "✅ Both servers are running!"
echo "Backend: http://localhost:3000 (PID: $BACKEND_PID)"
echo "Frontend: http://localhost:5175 (PID: $FRONTEND_PID)"
echo ""
echo "Logs: backend.log and frontend.log"
