import WorkoutForm from '../Components/WorkoutForm';

const WorkoutPage = () => {
  return (
    <div className="relative w-full min-h-screen">
      
      {/* Background Image insert*/}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/image6.jpg')` }}
      ></div>

      {/* Dark Overlay code here*/}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Workout Form Content styling here */}
      <div className="relative z-10 flex justify-center items-center w-full min-h-screen px-4 py-12">
        <div className=" text-white rounded-lg shadow-lg p-10 w-full max-w-4xl">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;
