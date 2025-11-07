import "./Home.css";
import eventBg from "./bg.jpg"; // your dark background image

function Home() {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${eventBg})` }}>
      <div className="overlay"></div>
      <div className="home-content">
        <h2 className="welcome-text">Welcome to <span>TECH FORUM</span></h2>
        <p>IEEE SPS KERALA CHAPTER</p>
      </div>
    </div>
  );
}

export default Home;
