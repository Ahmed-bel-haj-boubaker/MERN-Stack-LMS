interface ITicket {
  text: string;
  className: string;
}

const Ticket = ({ text, className }: ITicket) => {
  return (
    <>
      <h6
        className={`text-center bg-gray-200   ${className} rounded-full px-4 py-2`}
      >
        {text}
      </h6>
    </>
  );
};

export default Ticket;
