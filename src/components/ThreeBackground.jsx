import bgImage from '../../backgroundimage.jpg';

const ThreeBackground = () => {
    return (
        <>
            {/* Background Image */}
            <div 
                className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{
                    // 2. Use the variable name here
                    backgroundImage: `url(${bgImage})`
                }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 -z-10 bg-slate-900/70" />
        </>
    );
};

export default ThreeBackground;