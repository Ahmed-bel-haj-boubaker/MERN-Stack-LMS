interface IButtonProps {
  text: string;
  onClicks?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
}

const Button: React.FC<IButtonProps> = ({ text, onClicks, href }) => {
  return (
    <button
      className="px-3 py-2 border border-black text-black font-bold rounded-full transition-transform transform hover:scale-105 duration-200 ease-in-out bg-yellow-400 hover:bg-indigo-600 hover:text-white"
      style={{
        boxShadow: "4px 4px 0px black",
        transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "none")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "4px 4px 0px black")
      }
      onClick={onClicks}
    >
      {href ? <a href={`/${href}`}>{text}</a> : text}
    </button>
  );
};

export default Button;
