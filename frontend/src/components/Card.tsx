import { Movie } from "../App";

export default function Card({
  movie,
  onDelete,
  onEdit,
}: {
  movie: Movie;
  onDelete: (id: number) => void;
  onEdit: (movie: Movie) => void;
}) {
  return (
    <div className="border rounded-lg p-4 flex">
      <div className="w-1/4">
        <img src={movie.urlImage} alt={movie.title} className="w-full h-auto" />
      </div>
      <div className="w-3/4 pl-4">
        <h2 className="text-xl font-bold">{movie.title}</h2>
        <p>Sutradara: {movie.director}</p>
        <p>Genre: {movie.genre}</p>
        <p>Durasi: {movie.duration} menit</p>
        <p>Rating: {movie.rating}</p>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white rounded-lg py-1 px-2"
            onClick={() => {
              if (confirm(`Apakah Anda yakin ingin menghapus film "${movie.title}"?`)) {
                onDelete(movie.id);
              }
            }}
          >
            Delete
          </button>
          <button
            className="bg-yellow-500 text-white rounded-lg py-1 px-2"
            onClick={() => onEdit(movie)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
