const About = () => {
  return (
    <div className="app-container">
      <h2>About Me</h2>
      <p>
        Hey there! 👋 I'm <span className="about-highlight">Jasper Ling</span>, a{" "}
        <span className="about-highlight">Software Engineer</span> based in{" "}
        <span className="about-highlight">🇸🇬 Singapore</span>. I'm passionate about{" "}
        <span className="about-highlight">[Your Interests/Hobbies]</span> and enjoy{" "}
        <span className="about-highlight">[Your Activities]</span>. I love exploring
        new ideas, learning, and sharing knowledge.
      </p>
      <h3>Background</h3>
      <p>
        I have a background in{" "}
        <span className="about-highlight">Computer Science</span> and
        have been involved in{" "}
        <span className="about-highlight">[Your Experience/Projects]</span>. I believe
        in continuous growth and strive to{" "}
        <span className="about-highlight">[Your Aspirations]</span>.
      </p>
      <h3>Interests</h3>
      <p>
        In my free time, I enjoy{" "}
        <span className="about-highlight">
          working out, watching basketball, solving puzzles, watching mystery movies
        </span>
        . I'm a firm believer in{" "}
        <span className="about-highlight">[Your Beliefs/Philosophies]</span>.
      </p>
      <h3>Get in Touch</h3>
      <p>
        Feel free to connect with me on{" "}
        <a className="about-highlight-underline" href="http://www.linkedin.com/in/jasperlyf/">LinkedIn</a> or shoot
        me an email at <a className="about-highlight-underline" href="mailto:jasperlyf@outlook.com">jasperlyf@outlook.com</a>.
        Let's chat about collaborate on exciting projects!
      </p>
      <p>Looking forward to connecting with you! 🚀</p>
    </div>
  );
};

export default About;
