const ThreeBackground = () => {
    // Use the base URL from Vite config for correct asset paths on both GitHub Pages and Vercel
    const base = import.meta.env.BASE_URL || '/';
    return (
        <>
            {/* Background Image */}
            <div 
                className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${base}backgroundimage.jpg)`
                }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 -z-10 bg-slate-900/70" />
        </>
    );
};

export default ThreeBackground;
