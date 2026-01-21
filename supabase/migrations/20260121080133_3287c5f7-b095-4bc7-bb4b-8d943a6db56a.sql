-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_ko TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ko TEXT NOT NULL,
  website_url TEXT NOT NULL DEFAULT '',
  editor_url TEXT NOT NULL DEFAULT '',
  github_url TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  category_ko TEXT NOT NULL,
  category_color TEXT NOT NULL DEFAULT 'green',
  completion INTEGER NOT NULL DEFAULT 0 CHECK (completion >= 0 AND completion <= 100),
  documents JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Everyone can view projects
CREATE POLICY "Anyone can view projects"
ON public.projects
FOR SELECT
USING (true);

-- Admins can insert projects
CREATE POLICY "Admins can insert projects"
ON public.projects
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update projects
CREATE POLICY "Admins can update projects"
ON public.projects
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete projects
CREATE POLICY "Admins can delete projects"
ON public.projects
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Insert sample projects
INSERT INTO public.projects (title, title_ko, description, description_ko, website_url, editor_url, github_url, thumbnail_url, category, category_ko, category_color, completion, documents) VALUES
('E-Commerce Platform', '전자상거래 플랫폼', 'Full-featured online shopping platform with payment integration, inventory management, and customer analytics.', '결제 통합, 재고 관리 및 고객 분석 기능을 갖춘 완전한 기능의 온라인 쇼핑 플랫폼.', 'https://example.com/ecommerce', 'https://editor.example.com/ecommerce', 'https://github.com/grouptk/ecommerce', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', 'Website', '웹사이트', 'green', 100, '[{"id": "d1", "name": "Project Proposal", "url": "/brochure.pdf", "type": "pdf"}]'),
('Analytics Dashboard', '분석 대시보드', 'Real-time business intelligence dashboard with interactive charts, reports, and data visualization tools.', '대화형 차트, 보고서 및 데이터 시각화 도구가 포함된 실시간 비즈니스 인텔리전스 대시보드.', 'https://example.com/analytics', 'https://editor.example.com/analytics', 'https://github.com/grouptk/analytics', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', 'Dashboard', '대시보드', 'purple', 85, '[]'),
('Mobile Banking App', '모바일 뱅킹 앱', 'Secure mobile banking application with biometric authentication, transfers, and account management.', '생체 인증, 송금 및 계좌 관리 기능이 포함된 안전한 모바일 뱅킹 애플리케이션.', 'https://example.com/banking', 'https://editor.example.com/banking', 'https://github.com/grouptk/banking', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop', 'App', '앱', 'orange', 70, '[{"id": "d2", "name": "Security Audit", "url": "/brochure.pdf", "type": "pdf"}, {"id": "d3", "name": "App Screenshot", "url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop", "type": "image"}]'),
('Corporate Portal', '기업 포털', 'Internal corporate portal with employee directory, document management, and communication tools.', '직원 디렉토리, 문서 관리 및 커뮤니케이션 도구가 포함된 내부 기업 포털.', 'https://example.com/portal', 'https://editor.example.com/portal', 'https://github.com/grouptk/portal', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', 'Website', '웹사이트', 'green', 95, '[]'),
('Healthcare Platform', '헬스케어 플랫폼', 'Telemedicine platform with appointment scheduling, video consultations, and medical records.', '예약 스케줄링, 화상 상담 및 의료 기록이 포함된 원격 의료 플랫폼.', 'https://example.com/healthcare', 'https://editor.example.com/healthcare', 'https://github.com/grouptk/healthcare', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop', 'App', '앱', 'blue', 60, '[{"id": "d4", "name": "HIPAA Compliance", "url": "/brochure.pdf", "type": "pdf"}]'),
('Inventory System', '재고 관리 시스템', 'Warehouse management system with barcode scanning, stock tracking, and automated reordering.', '바코드 스캐닝, 재고 추적 및 자동 재주문 기능이 포함된 창고 관리 시스템.', 'https://example.com/inventory', 'https://editor.example.com/inventory', 'https://github.com/grouptk/inventory', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop', 'Dashboard', '대시보드', 'purple', 40, '[]');