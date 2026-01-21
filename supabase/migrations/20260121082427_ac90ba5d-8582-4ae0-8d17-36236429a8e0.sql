-- Create storage bucket for project documents
INSERT INTO storage.buckets (id, name, public) VALUES ('project-documents', 'project-documents', true);

-- Allow anyone to view documents
CREATE POLICY "Anyone can view documents" ON storage.objects FOR SELECT USING (bucket_id = 'project-documents');

-- Allow admins to upload documents
CREATE POLICY "Admins can upload documents" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'project-documents' AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to update documents
CREATE POLICY "Admins can update documents" ON storage.objects FOR UPDATE USING (
  bucket_id = 'project-documents' AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete documents
CREATE POLICY "Admins can delete documents" ON storage.objects FOR DELETE USING (
  bucket_id = 'project-documents' AND public.has_role(auth.uid(), 'admin')
);