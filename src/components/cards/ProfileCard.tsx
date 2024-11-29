const ProfileCard = () => {
    return (
      <div className="p-4 bg-white rounded shadow">
        {/* <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-16 h-16 rounded-full mb-4"
        /> */}
        <h3 className="text-lg font-semibold">Dianne Russell</h3>
        <p className="text-gray-500">Customer</p>
        <button className="text-green-600 hover:underline mt-2">Edit Profile</button>
      </div>
    );
  };
  
  export default ProfileCard;
  