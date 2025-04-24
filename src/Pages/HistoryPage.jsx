import HistoryList from '../Components/HistoryList';

const History = () => {
  return (
    <div className="relative w-full min-h-screen">
      
      {/* Background Image insert here */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/image6.jpg')` }}
      ></div>

      {/* Dark Overlay  here*/}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 flex justify-center items-center w-full min-h-screen px-4 py-12">
        <div className="bg-[#1e3a5f]/90 text-white rounded-lg shadow-lg p-10 w-full max-w-6xl">
          <HistoryList />
        </div>
      </div>
    </div>
  );
};

export default History;
