import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds, offset = 150) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Priority 1: If we are at the very top, dashboard is always active
      if (window.scrollY < 100) {
        setActiveId('dashboard');
        return;
      }

      const scrollPosition = window.scrollY + offset;

      const selectedSection = sectionIds.reduce((acc, id) => {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            return id;
          }
        }
        return acc;
      }, '');

      if (selectedSection && selectedSection !== activeId) {
        setActiveId(selectedSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial run
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset, activeId]);

  return activeId;
};
