export default function Header() {
    return (
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Indonesian Movies</h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  