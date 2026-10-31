function About() {
  return (
    <main className="content">
      <section className="about">
        <div className="about__container">
          <h1 className="about__title">Sobre el autor</h1>
          <div className="about__card">
            <div className="about__avatar" aria-hidden="true">
              MA
            </div>
            <div className="about__body">
              <h2 className="about__name">Manuel Aleman</h2>
              <p className="about__text">
                Soy desarrollador web full stack formado en TripleTen. Trabajo con React y TypeScript en el
                front end, y con Node.js, Express y MongoDB en el back end.
              </p>
              <p className="about__text">
                Moto Garage nació de mi gusto por las motocicletas: quería un lugar sencillo para consultar
                la ficha técnica de cualquier modelo y, más adelante, guardar las motos que me interesan con
                mis propias notas.
              </p>
              <h3 className="about__subtitle">Tecnologías del proyecto</h3>
              <ul className="about__tags">
                <li className="about__tag">React</li>
                <li className="about__tag">TypeScript</li>
                <li className="about__tag">Vite</li>
                <li className="about__tag">React Router</li>
                <li className="about__tag">API Ninjas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
