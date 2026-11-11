interface PreloaderProps {
  text?: string;
}

function Preloader({ text = 'Buscando motocicletas…' }: PreloaderProps) {
  return (
    <div className="preloader" role="status">
      <span className="preloader__circle" />
      <p className="preloader__text">{text}</p>
    </div>
  );
}

export default Preloader;
