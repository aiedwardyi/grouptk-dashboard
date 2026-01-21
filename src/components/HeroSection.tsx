import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, TrendingUp, Users, Building2, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  const { t, language } = useLanguage();

  const stats = [
    { icon: Calendar, value: '1982', label: t.stats.since },
    { icon: TrendingUp, value: '$167M', label: t.stats.fundsRaised },
    { icon: Users, value: '70M+', label: t.stats.users },
    { icon: Building2, value: '$2.5B', label: t.stats.marketCap },
  ];

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {t.hero.title}{' '}
            <span className="text-gradient">{t.hero.titleHighlight}</span>
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t.hero.subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card glow-border p-6 text-center animate-fade-in hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold font-display text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
