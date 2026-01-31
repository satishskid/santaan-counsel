-- CreateTable: Protocols
CREATE TABLE "protocols" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "color" TEXT,
    "schedule" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable: Action Series (Protocol Instances)
CREATE TABLE "action_series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patient_id" TEXT NOT NULL,
    "protocol_id" TEXT NOT NULL,
    "event_id" TEXT,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "original_schedule" JSONB NOT NULL,
    "current_schedule" JSONB NOT NULL,
    "completed_actions" INTEGER NOT NULL DEFAULT 0,
    "total_actions" INTEGER NOT NULL,
    "edits" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "action_series_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "action_series_protocol_id_fkey" FOREIGN KEY ("protocol_id") REFERENCES "protocols" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "action_series_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "timeline_events" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Add new columns to action_queue
ALTER TABLE "action_queue" ADD COLUMN "series_id" TEXT;
ALTER TABLE "action_queue" ADD COLUMN "series_day" INTEGER;
ALTER TABLE "action_queue" ADD COLUMN "scheduled_for" TIMESTAMP(3);
ALTER TABLE "action_queue" ADD COLUMN "action_location" TEXT;
ALTER TABLE "action_queue" ADD COLUMN "action_icon" TEXT;
ALTER TABLE "action_queue" ADD COLUMN "is_skipped" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "action_queue" ADD COLUMN "skip_reason" TEXT;

-- Add foreign key for series
ALTER TABLE "action_queue" ADD CONSTRAINT "action_queue_series_id_fkey" 
    FOREIGN KEY ("series_id") REFERENCES "action_series" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Create indexes
CREATE INDEX "action_series_patient_id_idx" ON "action_series"("patient_id");
CREATE INDEX "action_series_protocol_id_idx" ON "action_series"("protocol_id");
CREATE INDEX "action_series_status_idx" ON "action_series"("status");
CREATE INDEX "action_queue_series_id_idx" ON "action_queue"("series_id");
CREATE INDEX "action_queue_scheduled_for_idx" ON "action_queue"("scheduled_for");
