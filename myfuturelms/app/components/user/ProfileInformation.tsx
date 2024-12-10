import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface IProfileInformation {
  username: string;
  registrationDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  occupation: string;
  biography: string;
}

const ProfileInformation: React.FC<IProfileInformation> = ({
  username,
  biography,
  email,
  firstName,
  lastName,
  occupation,
  phoneNumber,
  registrationDate,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="font-semibold">Registration Date</p>
          <p>{registrationDate}</p>
        </div>
        <div>
          <p className="font-semibold">First Name</p>
          <p className="flex items-center">
            {firstName || (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                <span>not provided yet!</span>
              </>
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold">Last Name</p>
          <p className="flex items-center">
            {lastName || (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                <span>not provided yet!</span>
              </>
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold">Username</p>
          <p>{username}</p>
        </div>
        <div>
          <p className="font-semibold">Email</p>
          <p>{email}</p>
        </div>
        <div>
          <p className="font-semibold">Phone Number</p>
          <p className="flex items-center">
            {phoneNumber || (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                <span>not provided yet!</span>
              </>
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold">Occupation</p>
          <p className="flex items-center">
            {occupation || (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                <span>not provided yet!</span>
              </>
            )}
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="font-semibold">Biography</p>
          <p className="flex items-center">
            {biography || (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                <span>not provided yet!</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
