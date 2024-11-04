interface ITicket {
  text: string;
}

const Ticket = ({ text }: ITicket) => {
  return (
    <>
      <h6 className="text-center bg-gray-200 font-bold text-indigo-800 rounded-full px-4 py-2">
        {text}
      </h6>
    </>
  );
};

export default Ticket;
