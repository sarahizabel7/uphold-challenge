import "./Title.css";

const Title = ({ title, subtitle }) => {
  return (
    <div className="title-container">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export { Title };
