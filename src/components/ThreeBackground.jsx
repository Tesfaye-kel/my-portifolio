const ThreeBackground = () => {
  return (
    <>
      {/* Background Image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/backgroundimage.jpg')`
        }}
      />
      {/* Dark Overlay for better visibility */}
      <div 
        className="absolute inset-0 -z-10 bg-slate-900/70"
      />
    </>
  );
};

export default ThreeBackground;
