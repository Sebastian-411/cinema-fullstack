function Hero() {
  return (
    <>
      <header className="mt-5 bg-white p-8">
        <div className="w-w-full container mx-auto pt-12 pb-24 text-center">
          <p
            color="blue-gray"
            className="mx-auto w-full text-[30px] lg:text-[48px] font-bold leading-[45px] lg:leading-[60px] lg:max-w-2xl"
          >
            ICESI CINEMA
          </p>
          <p
            variant="lead"
            className="mx-auto mt-8 mb-4 w-full px-8 !text-gray-700 lg:w-10/12 lg:px-12 xl:w-8/12 xl:px-20"
          >
            Texto que hable sobre el cine
          </p>
        </div>
      </header>
    </>
  );
}
export default Hero;
