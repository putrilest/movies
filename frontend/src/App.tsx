import { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Footer from "./components/Footer";

export interface Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  urlImage: string;
  duration: number;
  rating: number;
}

const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Thriller"];

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Partial<Movie>>({
    title: "",
    director: "",
    genre: "",
    urlImage: "",
    duration: 0,
    rating: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Movie | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterGenre, setFilterGenre] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((response) => response.json())
      .then((movies) => setMovies(movies));
  }, []);

  function handleDelete(id: number) {
    fetch(`http://localhost:8080/api/movies/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setMovies(movies.filter((movie) => movie.id !== id));
      }
    });
  }

  function handleEdit(movie: Movie) {
    setMovie(movie);
    setIsEditing(true);
  }

  function handleSave() {
    if (!movie.title || !movie.director || !movie.genre || !movie.duration || !movie.rating || !movie.urlImage) {
      alert("Semua field harus diisi.");
      return;
    }

    if (movie.rating < 1 || movie.rating > 10) {
      alert("Rating harus antara 1 dan 10.");
      return;
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:8080/api/movies/${movie.id}`
      : "http://localhost:8080/api/movies";
    
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((response) => response.json())
      .then((savedMovie) => {
        if (isEditing) {
          setMovies(movies.map((m) => (m.id === savedMovie.id ? savedMovie : m)));
        } else {
          setMovies([...movies, savedMovie]);
        }
        setMovie({
          title: "",
          director: "",
          genre: "",
          urlImage: "",
          duration: 0,
          rating: 0,
        });
        setIsEditing(false);
      });
  }

  const filteredMovies = movies
    .filter((movie) => 
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterGenre === "" || movie.genre === filterGenre)
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="bg-white rounded-lg p-4">
      <Header />
      <h1 className="text-2xl font-bold mb-4 p-2">List Movie</h1>

      <div className="flex gap-4">
        <div className="w-1/3">
          <div className="border rounded-lg p-4 mb-4">
            <input
              type="text"
              placeholder="Cari film..."
              className="border p-1 w-full mb-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex gap-2 mb-2">
              <label>Urutkan berdasarkan:</label>
              <select
                className="border p-1"
                value={sortField}
                onChange={(e) => setSortField(e.target.value as keyof Movie)}
              >
                <option value="">Pilih</option>
                <option value="title">Judul</option>
                <option value="duration">Durasi</option>
                <option value="genre">Genre</option>
                <option value="rating">Rating</option>
              </select>
              <select
                className="border p-1"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="flex gap-2 mb-2">
              <label>Filter berdasarkan genre:</label>
              <select
                className="border p-1"
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
              >
                <option value="">Semua</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Add/Edit Movie</h2>
            <div className="grid grid-cols-1 gap-2">
              <label>Judul</label>
              <input
                className="border p-1"
                value={movie.title}
                onChange={(e) => setMovie({ ...movie, title: e.target.value })}
              />

              <label>Sutradara</label>
              <input
                className="border p-1"
                value={movie.director}
                onChange={(e) => setMovie({ ...movie, director: e.target.value })}
              />

              <label>Genre</label>
              <select
                className="border p-1"
                value={movie.genre}
                onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
              >
                <option value="">Pilih Genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>

              <label>URL Gambar</label>
              <input
                className="border p-1"
                value={movie.urlImage}
                onChange={(e) => setMovie({ ...movie, urlImage: e.target.value })}
              />

              <label>Durasi (menit)</label>
              <input
                type="number"
                className="border p-1"
                value={movie.duration}
                onChange={(e) =>
                  setMovie({ ...movie, duration: parseInt(e.target.value) })
                }
              />

              <label>Rating (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                className="border p-1"
                value={movie.rating}
                onChange={(e) =>
                  setMovie({ ...movie, rating: parseInt(e.target.value) })
                }
              />

              <button
                className="bg-blue-500 text-white rounded-lg py-1"
                onClick={handleSave}
              >
                {isEditing ? "Update" : "Simpan"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-2/3">
          <div className="grid gap-4">
            {filteredMovies.map((movie) => (
              <Card
                key={movie.id}
                movie={movie}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
