import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const ProfileEditModal = ({ setOpenModal }) => {
  const { user, updateUser } = useContext(AuthContext);
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(null);

  const handleProfileUpdate = (data) => {
    setProfileUpdateLoading(true);
    const profile = {
      displayName: data.updatedName
    };

    updateUser(profile)
      .then(res => {
        toast.success('profile update done')
        navigate('/dashboard')
        setOpenModal(false)
      })
      .catch(error => {
        toast.error(error.message);
      })
  };

  return (
    <div>
      <input type="checkbox" id="profile-Edit-Modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="profile-Edit-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

          <form onSubmit={handleSubmit(handleProfileUpdate)} className='mt-6 space-y-3'>
            <input {...register('updatedName')} type="text" defaultValue={user?.displayName} className="input input-bordered w-full" />
            <input defaultValue={user?.email} disabled type="email" placeholder="Email Address" className="input input-bordered w-full" required />
            <input disabled={profileUpdateLoading} type="submit" className='btn btn-primary w-full text-xl' value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;