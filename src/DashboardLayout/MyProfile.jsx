import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GetProfile, updateProfile } from "../API/productapi";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "", // ✅ added
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await GetProfile();
      setProfile(res);
      setFormData(res); // address bhi yahin se set ho jayega
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(profile._id, formData);
      alert("Profile updated successfully ✅");
      setOpenModal(false);
      fetchProfile();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center mt-10">No profile data</div>;
  }

  return (
    <div className="md:px-4 py-10">
      <h1 className="text-3xl font-medium md:text-4xl font-roboto text-[#224F34] text-center">
        My Profile
      </h1>

      <div className="w-full mx-auto mt-8 bg-white rounded-xl shadow p-2 md:p-6">
        <div className="flex justify-center mb-6 bg-[#DFF5E6]">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <FaRegUser size={36} className="text-gray-500" />
          </div>
        </div>

        <ProfileRow label="Name" value={profile.name} />
        <ProfileRow label="Email" value={profile.email} />
        <ProfileRow label="Phone" value={profile.number} />
        <ProfileRow label="Address" value={profile.address} /> {/* ✅ added */}

        <button
          onClick={() => setOpenModal(true)}
          className="w-full py-3 rounded-lg font-medium text-black shadow-md transition transform active:scale-[0.98] bg-[#DFF5E6] hover:opacity-90 cursor-pointer hover:shadow-lg"
        >
          Update Profile
        </button>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-3xl font-medium md:text-4xl font-roboto text-[#224F34] text-center">
              Update Profile
            </h2>

            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Name"
              className="w-full mb-3 border px-3 py-2 rounded-lg"
            />

            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mb-3 border px-3 py-2 rounded-lg"
            />

            <input
              name="number"
              value={formData.number || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full mb-3 border px-3 py-2 rounded-lg"
            />

            {/* ✅ Address input added */}
            <textarea
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Address"
              className="w-full mb-3 border px-3 py-2 rounded-lg"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 cursor-pointer border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-black cursor-pointer text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div className="flex justify-between py-3 border-b last:border-none">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="font-medium text-gray-800">{value || "-"}</span>
  </div>
);

export default ProfilePage;