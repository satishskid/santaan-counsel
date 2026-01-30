-- CreateTable
CREATE TABLE "clinics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "license_key" TEXT,
    "license_expires_at" TIMESTAMP(3),
    "settings" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clinics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "assigned_to_name" TEXT,
    "assigned_to_email" TEXT,
    "assigned_date" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    "mr_number" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "age" INTEGER,
    "phone" TEXT,
    "email" TEXT,
    "amh" DOUBLE PRECISION,
    "bmi" DOUBLE PRECISION,
    "previous_cycles" INTEGER NOT NULL DEFAULT 0,
    "preferred_language" TEXT NOT NULL DEFAULT 'hindi_english',
    "detail_preference" TEXT NOT NULL DEFAULT 'high',
    "visual_learner" BOOLEAN NOT NULL DEFAULT false,
    "baseline_anxiety" INTEGER NOT NULL DEFAULT 5,
    "current_anxiety" INTEGER NOT NULL DEFAULT 5,
    "anxiety_triggers" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment_cycles" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "cycle_number" INTEGER NOT NULL,
    "protocol" TEXT,
    "start_date" TIMESTAMP(3),
    "expected_retrieval_date" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'active',
    "current_phase" TEXT,
    "cycle_day" INTEGER,
    "outcome" TEXT,
    "outcome_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "treatment_cycles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_events" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "cycle_id" TEXT,
    "event_type" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cycle_day" INTEGER,
    "created_by" TEXT NOT NULL,
    "staff_role" TEXT NOT NULL,
    "clinical_data" JSONB,
    "communication_data" JSONB,
    "reaction_data" JSONB,
    "counseling_data" JSONB,
    "summary_text" TEXT,
    "patient_record_text" TEXT,
    "searchable_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "timeline_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "trigger_conditions" JSONB,
    "suggested_visuals" TEXT[],
    "talking_points" TEXT[],
    "times_used" INTEGER NOT NULL DEFAULT 0,
    "avg_anxiety_reduction" DOUBLE PRECISION,
    "avg_response_time_minutes" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visual_assets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "file_url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "file_type" TEXT NOT NULL,
    "file_size_kb" INTEGER NOT NULL,
    "languages" TEXT[],
    "times_used" INTEGER NOT NULL DEFAULT 0,
    "effectiveness_score" DOUBLE PRECISION,
    "suggested_for_events" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visual_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acronym_dictionary" (
    "id" TEXT NOT NULL,
    "clinic_id" TEXT,
    "acronym" TEXT NOT NULL,
    "expansion" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unit" TEXT,
    "normal_range_min" DOUBLE PRECISION,
    "normal_range_max" DOUBLE PRECISION,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "acronym_dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinic_performance" (
    "id" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "active_patients" INTEGER NOT NULL,
    "new_patients" INTEGER NOT NULL,
    "cycles_started" INTEGER NOT NULL,
    "cycles_completed" INTEGER NOT NULL,
    "egg_retrievals" INTEGER NOT NULL,
    "avg_eggs_retrieved" DOUBLE PRECISION,
    "transfers" INTEGER NOT NULL,
    "positive_betas" INTEGER NOT NULL,
    "messages_sent" INTEGER NOT NULL,
    "patient_responses" INTEGER NOT NULL,
    "avg_response_time_minutes" INTEGER,
    "avg_anxiety_reduction" DOUBLE PRECISION,
    "documentation_completion_rate" DOUBLE PRECISION,
    "visual_usage_rate" DOUBLE PRECISION,
    "staff_entries" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clinic_performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_queue" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "action_type" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "event_id" TEXT,
    "template_id" TEXT,
    "suggested_visuals" TEXT[],
    "due_at" TIMESTAMP(3) NOT NULL,
    "assigned_to" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "completed_at" TIMESTAMP(3),
    "completed_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "action_queue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clinics_domain_key" ON "clinics"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "clinics_license_key_key" ON "clinics"("license_key");

-- CreateIndex
CREATE UNIQUE INDEX "users_clinic_id_username_key" ON "users"("clinic_id", "username");

-- CreateIndex
CREATE UNIQUE INDEX "patients_mr_number_key" ON "patients"("mr_number");

-- CreateIndex
CREATE INDEX "timeline_events_patient_id_event_date_idx" ON "timeline_events"("patient_id", "event_date" DESC);

-- CreateIndex
CREATE INDEX "timeline_events_cycle_id_event_date_idx" ON "timeline_events"("cycle_id", "event_date" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "acronym_dictionary_acronym_key" ON "acronym_dictionary"("acronym");

-- CreateIndex
CREATE UNIQUE INDEX "clinic_performance_clinic_id_date_key" ON "clinic_performance"("clinic_id", "date");

-- CreateIndex
CREATE INDEX "action_queue_status_due_at_idx" ON "action_queue"("status", "due_at");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_cycles" ADD CONSTRAINT "treatment_cycles_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_events" ADD CONSTRAINT "timeline_events_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_events" ADD CONSTRAINT "timeline_events_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "treatment_cycles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_events" ADD CONSTRAINT "timeline_events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acronym_dictionary" ADD CONSTRAINT "acronym_dictionary_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_performance" ADD CONSTRAINT "clinic_performance_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_queue" ADD CONSTRAINT "action_queue_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_queue" ADD CONSTRAINT "action_queue_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "timeline_events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_queue" ADD CONSTRAINT "action_queue_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_queue" ADD CONSTRAINT "action_queue_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_queue" ADD CONSTRAINT "action_queue_completed_by_fkey" FOREIGN KEY ("completed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
