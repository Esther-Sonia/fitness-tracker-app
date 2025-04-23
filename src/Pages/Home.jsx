const Home = () => {
    return (
      
      <div className="text-center py-10">
        <h1 className=" text-black-500 text-4xl font-bold mb-6">Welcome to FitTrack</h1>
        <p className="text-xl mb-8">Track your workouts and achieve your fitness goals</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-3">Log Workouts</h2>
            <p>Record your exercise sessions with details</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-3">View Stats</h2>
            <p>See your progress on the dashboard</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-3">History</h2>
            
            <p>Review all your past workouts</p>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default Home;