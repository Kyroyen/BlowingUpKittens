function Card({ type }) {
  return (
    <div className="w-40 h-56 bg-radial-gradient from-blue-500 to-purple-600 border-2 border-white rounded-lg mx-3 text-white items-center flex justify-center">
      <div>{type}</div>
    </div>
  );
}

export default Card;
