-- Add display_order column to projects table
ALTER TABLE public.projects ADD COLUMN display_order integer NOT NULL DEFAULT 0;

-- Set initial display_order based on created_at
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC, id ASC) as rn
  FROM public.projects
)
UPDATE public.projects p
SET display_order = o.rn
FROM ordered o
WHERE p.id = o.id;