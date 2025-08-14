import { Parallax } from "react-parallax";

const Cover1 = ({ img, title }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img} 
      bgImageAlt="cover image"
      strength={-200}
    >
      <div className="hero h-[500px]">
        <div className="hero-overlay bg-black bg-opacity-50"></div> 
        <div className="hero-content text-center text-white"> 
          <div className="max-w-xl mx-auto">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
            <p className="mb-5 text-lg">
              Find Lawer
            </p>
         
          </div>
        </div>
      </div>
    </Parallax>
  );
};
export default Cover1;
