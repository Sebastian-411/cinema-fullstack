import MovieCard from "./cards/MovieCard";

function CinemaList({ movies}) {
    return (
        <>
            <section className="grid place-items-center p-8">
                <div className="w-w-full container mx-auto pt-12 text-center">
                    <p className="mx-auto w-full text-[30px] lg:text-[48px] font-bold leading-[45px] lg:leading-[60px] lg:max-w-2xl">
                        Catalogo de cine
                    </p>
                    <p className="mx-auto mt-8 w-full px-8 !text-gray-700 lg:w-10/12 lg:px-12 xl:w-8/12 xl:px-20">
                        Todo nuestro catalogo historico de peliculas! Si encuentras una de tu interes, puedes llamar a nuestro numero de contacto para reservar tu funcion. Solo aplica reservas de sala completa si la pelicula no esta en cartelera.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-8">
                    {movies.length === 0 ? (
                        <p className="text-center text-lg font-semibold text-gray-700">
                            No se encontraron películas disponibles
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {movies.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    url={movie.imageUrl}
                                    name={movie.title}
                                    description={movie}
                                    id={movie.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
export default CinemaList;