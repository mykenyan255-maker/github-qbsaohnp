import { useRef, useEffect, useState } from 'react';

export default function BrowseByType() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categories = [
    { name: 'MEN', category: 'men' },
    { name: 'WOMEN', category: 'women' },
    { name: 'UNISEX', category: 'unisex' },
  ];

  const image = 'https://i.postimg.cc/PxWgxz9K/Soft-Leather-Duffel-Bag-40L-Convertible-Travel-Bag.jpg';

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let position = 0;
    const speed = 0.75;

    const animate = () => {
      if (!isDragging) {
        position += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
          position = 0;
        } else {
          container.scrollLeft = position;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h3 className="text-lg font-bold">Browse by Type</h3>
      </div>

      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {[...categories, ...categories].map((cat, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 h-32 group relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105"
            style={{ userSelect: 'none' }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex items-end justify-center pb-2">
                <p className="text-white font-bold text-xs text-center">{cat.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
