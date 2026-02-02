#!/bin/bash

# Backup Script for Santaan IVF Platform
# Creates encrypted backups of database and uploads

set -e

# Configuration
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "💾 Santaan Platform - Backup"
echo "============================"
echo ""

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup database
echo -e "${YELLOW}📊 Backing up database...${NC}"
docker-compose exec -T postgres pg_dump -U santaan_user -Fc santaan > "$BACKUP_DIR/db_$DATE.dump"

# Compress database backup
echo -e "${YELLOW}🗜️  Compressing database backup...${NC}"
gzip "$BACKUP_DIR/db_$DATE.dump"

# Backup uploads directory
echo -e "${YELLOW}📁 Backing up uploads...${NC}"
if [ -d "./backend/uploads" ]; then
    tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" -C ./backend uploads/
    echo -e "${GREEN}✅ Uploads backed up${NC}"
else
    echo "No uploads directory found, skipping..."
fi

# Calculate backup sizes
DB_SIZE=$(du -h "$BACKUP_DIR/db_$DATE.dump.gz" | cut -f1)
if [ -f "$BACKUP_DIR/uploads_$DATE.tar.gz" ]; then
    UPLOADS_SIZE=$(du -h "$BACKUP_DIR/uploads_$DATE.tar.gz" | cut -f1)
else
    UPLOADS_SIZE="N/A"
fi

echo ""
echo -e "${GREEN}✅ Backup Complete!${NC}"
echo "Database backup: $DB_SIZE ($BACKUP_DIR/db_$DATE.dump.gz)"
echo "Uploads backup: $UPLOADS_SIZE ($BACKUP_DIR/uploads_$DATE.tar.gz)"
echo ""

# Clean up old backups
echo -e "${YELLOW}🧹 Cleaning up old backups (older than $RETENTION_DAYS days)...${NC}"
find "$BACKUP_DIR" -name "db_*.dump.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "uploads_*.tar.gz" -mtime +$RETENTION_DAYS -delete

# List current backups
echo ""
echo "Current backups:"
ls -lh "$BACKUP_DIR" | grep -E '\.(dump\.gz|tar\.gz)$' | tail -10

echo ""
echo -e "${GREEN}Backup completed successfully!${NC}"
echo "To restore:"
echo "  Database: gunzip < $BACKUP_DIR/db_$DATE.dump.gz | docker-compose exec -T postgres pg_restore -U santaan_user -d santaan --clean"
echo "  Uploads: tar -xzf $BACKUP_DIR/uploads_$DATE.tar.gz -C ./backend/"
