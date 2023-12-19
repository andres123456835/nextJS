export default function HeroSection() {
    return (
      <div className="relative bg-cover bg-center bg-no-repeat h-screen" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}>
        <div className="bg-opacity-50 bg-black absolute inset-0" />
        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenido a Nuestra Aplicación</h1>
            <p className="text-xl md:text-2xl mb-8">Explora comercios, encuentra servicios y mucho más.</p>
            <a href="#features" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">Descubre más</a>
          </div>
        </div>
      </div>
    );
  }
  