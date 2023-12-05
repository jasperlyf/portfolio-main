import React from "react";
import "./css/About.css"; // Import your CSS file
import BasketballApp from "./BasketballApp";

const About = () => {
  return (
    <div className="bio-container">
      <h2>About Me</h2>
      <p>
        Hey there! 👋 I'm <span className="highlight">Jasper Ling</span>, a{" "}
        <span className="highlight">Software Engineer</span> based in{" "}
        <span className="highlight">Singapore</span>. I'm passionate about{" "}
        <span className="highlight">[Your Interests/Hobbies]</span> and enjoy{" "}
        <span className="highlight">[Your Activities]</span>. I love exploring
        new ideas, learning, and sharing knowledge.
      </p>
      <h3>Background</h3>
      <p>
        I have a background in{" "}
        <span className="highlight">[Your Field/Area of Expertise]</span> and
        have been involved in{" "}
        <span className="highlight">[Your Experience/Projects]</span>. I believe
        in continuous growth and strive to{" "}
        <span className="highlight">[Your Aspirations]</span>.
      </p>
      <h3>Interests</h3>
      <p>
        In my free time, I enjoy{" "}
        <span className="highlight">
          [Hobbies/Activities], [Interests], and [Other Activities]
        </span>
        . I'm a firm believer in{" "}
        <span className="highlight">[Your Beliefs/Philosophies]</span>.
      </p>
      {/* <div>
        <BasketballApp />
      </div> */}
      <h3>Get in Touch</h3>
      <p>
        Feel free to connect with me on{" "}
        <span className="highlight">linkedin.com/in/jasperlyf/</span> or shoot
        me an email at <span className="highlight">jasperlyf@outlook.com</span>.
        Let's chat about{" "}
        <span className="highlight">[Common Interests/Topics]</span> or
        collaborate on exciting projects!
      </p>
      <p>Looking forward to connecting with you! 🚀</p>
    </div>
  );
};

export default About;
