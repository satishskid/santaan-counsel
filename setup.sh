#!/bin/bash

echo "🌱 Santaan IVF Platform - Setup Script"
echo "======================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    
    # Generate random JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    DB_PASSWORD=$(openssl rand -base64 16)
    
    # Update .env file
    sed -i.bak "s|your-super-secret-jwt-key-change-in-production|$JWT_SECRET|g" .env
    sed -i.bak "s|santaan_secure_password_change_me|$DB_PASSWORD|g" .env
    
    rm .env.bak
    
    echo "✅ Generated secure credentials"
else
    echo "⚠️  .env file already exists, skipping..."
fi

echo ""
echo "🐳 Starting Docker containers..."
docker-compose up -d

echo ""
echo "⏳ Waiting for database to be ready..."
sleep 10

echo ""
echo "🔄 Running database migrations..."
docker-compose exec -T backend npx prisma migrate deploy

echo ""
echo "🌱 Seeding database..."
docker-compose exec -T backend npm run prisma:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "📊 Access the application:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost:3000"
echo ""
echo "🔑 Demo Credentials:"
echo "   Username: admin"
echo "   Clinic Domain: demo"
echo "   Password: admin123"
echo ""
echo "📝 Other demo users:"
echo "   doctor1@demo / admin123"
echo "   nurse1@demo / admin123"
echo "   embryo1@demo / admin123"
echo ""
echo "🎉 Happy coding!"
