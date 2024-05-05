type AnecdoteProps = {
  title: string;
};

const Anecdote: React.FC<AnecdoteProps> = ({ title }) => {
  return (
    <div>
      <button>{title}</button>
    </div>
  );
};

export default Anecdote;
