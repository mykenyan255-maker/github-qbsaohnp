export default function DiscountBanner() {
  return (
    <div className="fixed top-4 right-4 z-30 pointer-events-none">
      <div className="relative w-16 h-32">
        <div
          className="absolute inset-0 bg-red-500 flex items-center justify-center rounded-full shadow-lg transform -rotate-45 origin-center"
          style={{
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            right: '-30px',
            top: '-50px',
          }}
        >
          <div className="text-white font-bold text-sm text-center leading-tight transform rotate-45">
            <div className="text-lg">50%</div>
            <div className="text-xs">OFF</div>
          </div>
        </div>
      </div>
    </div>
  );
}
