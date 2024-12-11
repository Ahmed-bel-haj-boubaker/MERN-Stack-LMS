import { FaRegClock } from "react-icons/fa";
import Mastercard from "../../public/images/mastercard.png";
import Paypal from "../../public/images/paypal.png";
import Visa from "../../public/images/visa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
interface IcourseInfo {
  lessons: number;
  price: number;
  level: string;
  participation: number;
  oldPrice: number;
}
const SideBar: React.FC<IcourseInfo> = ({
  lessons,
  level,
  participation,
  price,
  oldPrice,
}) => {
  return (
    <div className="w-full lg:w-1/4 bg-white shadow-2xl border border-gray rounded-lg p-6  mt-10">
      <div className="flex items-center justify-between text-white bg-purple-600 rounded-xl p-4 flex-col ">
        <span className="text-lg font-bold text-start ">This Course Fee:</span>
        <span className="font-bold justify-between text-2xl">
          <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
          {price} <span className="line-through text-lg  ">${oldPrice}</span>
        </span>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Course includes:</h2>
        <ul className="mt-2 text-gray-600">
          <li className="flex justify-between border-b border-gray-300 mb-2 pb-2">
            <div className="flex gap-2 items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.1667 17.9167H14.1667V1.66675H19.1667V17.9167ZM15.4167 16.6667H17.9167V2.91675H15.4167V16.6667ZM12.9167 17.9167H7.91666V6.66675H12.9167V17.9167ZM9.16666 16.6667H11.6667V7.91675H9.16666V16.6667ZM6.66666 17.9167H1.66666V10.4167H6.66666V17.9167ZM2.91666 16.6667H5.41666V11.6667H2.91666V16.6667Z"
                  fill="currentcolor"
                ></path>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1667 17.9167H14.1667V1.66675H19.1667V17.9167ZM15.4167 16.6667H17.9167V2.91675H15.4167V16.6667ZM12.9167 17.9167H7.91666V6.66675H12.9167V17.9167ZM9.16666 16.6667H11.6667V7.91675H9.16666V16.6667ZM6.66666 17.9167H1.66666V10.4167H6.66666V17.9167ZM2.91666 16.6667H5.41666V11.6667H2.91666V16.6667Z"
                    fill="currentcolor"
                  ></path>
                </svg>
                Level
              </svg>
              <div>Level</div>
            </div>
            {level}
          </li>
          <li className="flex items-center justify-between border-b border-gray-300 mb-2 pb-2">
            <div className="flex gap-2 items-center">
              <FaRegClock />
              <div>Duration</div>
            </div>
            11h 20m
          </li>
          <li className="flex items-center justify-between border-b border-gray-300 mb-2 pb-2">
            <div className="flex gap-2 items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.78579 15.3125H15.3519C17.0718 15.3125 18.471 13.9107 18.471 12.1875V3.125C18.471 1.40182 17.0718 0 15.3519 0H4.78579C3.06585 0 1.66666 1.40182 1.66666 3.125V16.875C1.66666 18.5982 3.06585 20 4.78579 20H15.3519C17.0718 20 18.471 18.5982 18.471 16.875C18.471 16.4435 18.1219 16.0937 17.6912 16.0937C17.2605 16.0937 16.9114 16.4435 16.9114 16.875C16.9114 17.7365 16.2118 18.4375 15.3519 18.4375H4.78579C3.9259 18.4375 3.22622 17.7365 3.22622 16.875C3.22622 16.0135 3.9259 15.3125 4.78579 15.3125ZM3.22622 3.125C3.22622 2.26349 3.9259 1.5625 4.78579 1.5625H15.3519C16.2118 1.5625 16.9114 2.26349 16.9114 3.125V12.1875C16.9114 13.049 16.2118 13.75 15.3519 13.75H4.78579C4.21801 13.75 3.68526 13.9027 3.22622 14.1693V3.125ZM6.38435 5.27344C6.38435 4.84192 6.73343 4.49219 7.16414 4.49219H13.0125C13.4432 4.49219 13.7923 4.84192 13.7923 5.27344C13.7923 5.70496 13.4432 6.05469 13.0125 6.05469H7.16414C6.73343 6.05469 6.38435 5.70496 6.38435 5.27344Z"
                  fill="currentcolor"
                ></path>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.78579 15.3125H15.3519C17.0718 15.3125 18.471 13.9107 18.471 12.1875V3.125C18.471 1.40182 17.0718 0 15.3519 0H4.78579C3.06585 0 1.66666 1.40182 1.66666 3.125V16.875C1.66666 18.5982 3.06585 20 4.78579 20H15.3519C17.0718 20 18.471 18.5982 18.471 16.875C18.471 16.4435 18.1219 16.0937 17.6912 16.0937C17.2605 16.0937 16.9114 16.4435 16.9114 16.875C16.9114 17.7365 16.2118 18.4375 15.3519 18.4375H4.78579C3.9259 18.4375 3.22622 17.7365 3.22622 16.875C3.22622 16.0135 3.9259 15.3125 4.78579 15.3125ZM3.22622 3.125C3.22622 2.26349 3.9259 1.5625 4.78579 1.5625H15.3519C16.2118 1.5625 16.9114 2.26349 16.9114 3.125V12.1875C16.9114 13.049 16.2118 13.75 15.3519 13.75H4.78579C4.21801 13.75 3.68526 13.9027 3.22622 14.1693V3.125ZM6.38435 5.27344C6.38435 4.84192 6.73343 4.49219 7.16414 4.49219H13.0125C13.4432 4.49219 13.7923 4.84192 13.7923 5.27344C13.7923 5.70496 13.4432 6.05469 13.0125 6.05469H7.16414C6.73343 6.05469 6.38435 5.70496 6.38435 5.27344Z"
                    fill="currentcolor"
                  ></path>
                </svg>
              </svg>
              <div>Lessons</div>
            </div>
            {lessons}
          </li>
          <li className="flex items-center justify-between border-b border-gray-300 mb-2 pb-2">
            <div className="flex gap-2 items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.701 9.00506H15.2923V5.25384C15.2923 4.97633 15.1859 4.71018 14.9966 4.51395C14.8074 4.31772 14.5506 4.20748 14.2829 4.20748H11.255C11.2231 3.57767 10.9787 2.97952 10.5645 2.51761C10.1503 2.05569 9.59271 1.75939 8.98915 1.6805C8.64393 1.64366 8.29509 1.68103 7.96444 1.7903C7.63378 1.89957 7.32843 2.07837 7.06745 2.31554C6.80648 2.5527 6.59551 2.84313 6.44771 3.16866C6.29992 3.4942 6.2185 3.84784 6.20852 4.20748H2.67596C2.40828 4.20748 2.15156 4.31772 1.96227 4.51395C1.77299 4.71018 1.66666 4.97633 1.66666 5.25384V9.52825H3.08473C3.47304 9.51655 3.85189 9.65362 4.14886 9.91324C4.44584 10.1729 4.64012 10.5368 4.69457 10.9356C4.71421 11.1544 4.68933 11.375 4.62152 11.5832C4.55371 11.7914 4.4445 11.9825 4.30094 12.1442C4.15985 12.3077 3.98724 12.4388 3.79427 12.5289C3.6013 12.619 3.39225 12.6662 3.18061 12.6673H1.66666V17.287C1.66666 17.5646 1.77299 17.8307 1.96227 18.0269C2.15156 18.2232 2.40828 18.3334 2.67596 18.3334H14.2829C14.5506 18.3334 14.8074 18.2232 14.9966 18.0269C15.1859 17.8307 15.2923 17.5646 15.2923 17.287V14.2369H15.7969C16.1511 14.2388 16.5017 14.1634 16.8259 14.0156C17.1501 13.8678 17.4407 13.6508 17.6787 13.3789C17.9167 13.107 18.0968 12.7862 18.2073 12.4373C18.3178 12.0885 18.3563 11.7194 18.3202 11.3542C18.2384 10.6973 17.9261 10.0947 17.443 9.66143C16.9599 9.22813 16.3398 8.99447 15.701 9.00506ZM16.9172 12.6673C16.7761 12.8309 16.6035 12.9619 16.4106 13.0521C16.2176 13.1422 16.0085 13.1893 15.7969 13.1905H14.2829V17.287H2.67596V13.7137H3.18061C3.53479 13.7156 3.88538 13.6402 4.20959 13.4924C4.5338 13.3446 4.82436 13.1277 5.06237 12.8557C5.30038 12.5838 5.4805 12.263 5.59103 11.9142C5.70155 11.5653 5.74 11.1962 5.70387 10.831C5.62208 10.1741 5.30982 9.57156 4.82671 9.13825C4.34359 8.70495 3.72346 8.47129 3.08473 8.48188H2.67596V5.25384H7.21782V4.29642C7.21896 4.07701 7.26446 3.86028 7.35138 3.66022C7.43831 3.46016 7.56472 3.28123 7.72248 3.13495C7.87841 2.98612 8.06275 2.8729 8.26356 2.8026C8.46437 2.7323 8.67718 2.7065 8.88822 2.72687C9.27286 2.78331 9.62395 2.98473 9.87438 3.29261C10.1248 3.60049 10.257 3.99325 10.2457 4.39582V5.25384H14.2829V10.0514H15.701C16.0893 10.0397 16.4682 10.1768 16.7652 10.4364C17.0621 10.6961 17.2564 11.06 17.3109 11.4588C17.3305 11.6776 17.3056 11.8982 17.2378 12.1064C17.17 12.3146 17.0608 12.5057 16.9172 12.6673Z"
                  fill="currentcolor"
                ></path>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.701 9.00506H15.2923V5.25384C15.2923 4.97633 15.1859 4.71018 14.9966 4.51395C14.8074 4.31772 14.5506 4.20748 14.2829 4.20748H11.255C11.2231 3.57767 10.9787 2.97952 10.5645 2.51761C10.1503 2.05569 9.59271 1.75939 8.98915 1.6805C8.64393 1.64366 8.29509 1.68103 7.96444 1.7903C7.63378 1.89957 7.32843 2.07837 7.06745 2.31554C6.80648 2.5527 6.59551 2.84313 6.44771 3.16866C6.29992 3.4942 6.2185 3.84784 6.20852 4.20748H2.67596C2.40828 4.20748 2.15156 4.31772 1.96227 4.51395C1.77299 4.71018 1.66666 4.97633 1.66666 5.25384V9.52825H3.08473C3.47304 9.51655 3.85189 9.65362 4.14886 9.91324C4.44584 10.1729 4.64012 10.5368 4.69457 10.9356C4.71421 11.1544 4.68933 11.375 4.62152 11.5832C4.55371 11.7914 4.4445 11.9825 4.30094 12.1442C4.15985 12.3077 3.98724 12.4388 3.79427 12.5289C3.6013 12.619 3.39225 12.6662 3.18061 12.6673H1.66666V17.287C1.66666 17.5646 1.77299 17.8307 1.96227 18.0269C2.15156 18.2232 2.40828 18.3334 2.67596 18.3334H14.2829C14.5506 18.3334 14.8074 18.2232 14.9966 18.0269C15.1859 17.8307 15.2923 17.5646 15.2923 17.287V14.2369H15.7969C16.1511 14.2388 16.5017 14.1634 16.8259 14.0156C17.1501 13.8678 17.4407 13.6508 17.6787 13.3789C17.9167 13.107 18.0968 12.7862 18.2073 12.4373C18.3178 12.0885 18.3563 11.7194 18.3202 11.3542C18.2384 10.6973 17.9261 10.0947 17.443 9.66143C16.9599 9.22813 16.3398 8.99447 15.701 9.00506ZM16.9172 12.6673C16.7761 12.8309 16.6035 12.9619 16.4106 13.0521C16.2176 13.1422 16.0085 13.1893 15.7969 13.1905H14.2829V17.287H2.67596V13.7137H3.18061C3.53479 13.7156 3.88538 13.6402 4.20959 13.4924C4.5338 13.3446 4.82436 13.1277 5.06237 12.8557C5.30038 12.5838 5.4805 12.263 5.59103 11.9142C5.70155 11.5653 5.74 11.1962 5.70387 10.831C5.62208 10.1741 5.30982 9.57156 4.82671 9.13825C4.34359 8.70495 3.72346 8.47129 3.08473 8.48188H2.67596V5.25384H7.21782V4.29642C7.21896 4.07701 7.26446 3.86028 7.35138 3.66022C7.43831 3.46016 7.56472 3.28123 7.72248 3.13495C7.87841 2.98612 8.06275 2.8729 8.26356 2.8026C8.46437 2.7323 8.67718 2.7065 8.88822 2.72687C9.27286 2.78331 9.62395 2.98473 9.87438 3.29261C10.1248 3.60049 10.257 3.99325 10.2457 4.39582V5.25384H14.2829V10.0514H15.701C16.0893 10.0397 16.4682 10.1768 16.7652 10.4364C17.0621 10.6961 17.2564 11.06 17.3109 11.4588C17.3305 11.6776 17.3056 11.8982 17.2378 12.1064C17.17 12.3146 17.0608 12.5057 16.9172 12.6673Z"
                    fill="currentcolor"
                  ></path>
                </svg>
              </svg>
              <div>Quizzes</div>
            </div>
            145
          </li>
          <li className="flex items-center justify-between border-b border-gray-300 mb-2 pb-2">
            <div className="flex gap-2 items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.1667 9.37479C19.1674 8.65706 18.9831 7.95019 18.63 7.3165C18.2769 6.68281 17.7659 6.14177 17.1421 5.74108C16.5182 5.3404 15.8007 5.09237 15.0527 5.01887C14.3047 4.94538 13.5493 5.04867 12.853 5.31964C12.1567 5.59061 11.5409 6.02094 11.06 6.57268C10.5791 7.12442 10.2478 7.78063 10.0953 8.48344C9.94276 9.18626 9.97376 9.9141 10.1855 10.6028C10.3973 11.2915 10.7833 11.9198 11.3095 12.4325V16.8746C11.3095 16.9812 11.3379 17.086 11.3923 17.1791C11.4466 17.2722 11.525 17.3505 11.62 17.4066C11.7149 17.4626 11.8234 17.4946 11.9349 17.4994C12.0465 17.5042 12.1574 17.4816 12.2573 17.4339L14.5833 16.323L16.9094 17.4339C17.0092 17.4816 17.1202 17.5042 17.2318 17.4994C17.3433 17.4946 17.4518 17.4626 17.5467 17.4066C17.6417 17.3505 17.7201 17.2722 17.7744 17.1791C17.8288 17.086 17.8572 16.9812 17.8572 16.8746V12.4325C18.6969 11.6167 19.1672 10.5185 19.1667 9.37479ZM14.5833 6.24989C15.2308 6.24989 15.8638 6.43316 16.4022 6.77653C16.9405 7.1199 17.3602 7.60794 17.6079 8.17894C17.8557 8.74995 17.9206 9.37826 17.7942 9.98443C17.6679 10.5906 17.3561 11.1474 16.8983 11.5844C16.4404 12.0215 15.8571 12.3191 15.222 12.4397C14.587 12.5602 13.9287 12.4983 13.3305 12.2618C12.7323 12.0253 12.221 11.6248 11.8613 11.1109C11.5015 10.597 11.3095 9.99284 11.3095 9.37479C11.3095 8.54602 11.6545 7.75119 12.2684 7.16515C12.8824 6.57912 13.7151 6.24989 14.5833 6.24989ZM14.8763 15.0652C14.7854 15.0218 14.6851 14.9992 14.5833 14.9992C14.4816 14.9992 14.3813 15.0218 14.2903 15.0652L12.6191 15.8637V13.327C13.2328 13.6053 13.9038 13.7497 14.5833 13.7497C15.2628 13.7497 15.9338 13.6053 16.5476 13.327V15.8637L14.8763 15.0652ZM10 14.3746C10 14.5404 9.93103 14.6994 9.80823 14.8166C9.68544 14.9338 9.5189 14.9996 9.34525 14.9996H2.14287C1.79556 14.9996 1.46248 14.8679 1.21689 14.6335C0.971311 14.3991 0.833344 14.0812 0.833344 13.7497V3.74996C0.833344 3.41845 0.971311 3.10052 1.21689 2.86611C1.46248 2.63169 1.79556 2.5 2.14287 2.5H16.5476C16.8949 2.5 17.228 2.63169 17.4736 2.86611C17.7192 3.10052 17.8572 3.41845 17.8572 3.74996C17.8572 3.91572 17.7882 4.07468 17.6654 4.19189C17.5426 4.3091 17.376 4.37494 17.2024 4.37494C17.0287 4.37494 16.8622 4.3091 16.7394 4.19189C16.6166 4.07468 16.5476 3.91572 16.5476 3.74996H2.14287V13.7497H9.34525C9.5189 13.7497 9.68544 13.8155 9.80823 13.9327C9.93103 14.0499 10 14.2089 10 14.3746ZM8.69049 9.99978C8.69049 10.1655 8.6215 10.3245 8.49871 10.4417C8.37592 10.5589 8.20938 10.6248 8.03572 10.6248H4.76191C4.58826 10.6248 4.42172 10.5589 4.29893 10.4417C4.17614 10.3245 4.10715 10.1655 4.10715 9.99978C4.10715 9.83402 4.17614 9.67505 4.29893 9.55785C4.42172 9.44064 4.58826 9.37479 4.76191 9.37479H8.03572C8.20938 9.37479 8.37592 9.44064 8.49871 9.55785C8.6215 9.67505 8.69049 9.83402 8.69049 9.99978ZM8.69049 7.49985C8.69049 7.66561 8.6215 7.82457 8.49871 7.94178C8.37592 8.05899 8.20938 8.12483 8.03572 8.12483H4.76191C4.58826 8.12483 4.42172 8.05899 4.29893 7.94178C4.17614 7.82457 4.10715 7.66561 4.10715 7.49985C4.10715 7.3341 4.17614 7.17513 4.29893 7.05792C4.42172 6.94072 4.58826 6.87487 4.76191 6.87487H8.03572C8.20938 6.87487 8.37592 6.94072 8.49871 7.05792C8.6215 7.17513 8.69049 7.3341 8.69049 7.49985Z"
                  fill="currentcolor"
                ></path>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1667 9.37479C19.1674 8.65706 18.9831 7.95019 18.63 7.3165C18.2769 6.68281 17.7659 6.14177 17.1421 5.74108C16.5182 5.3404 15.8007 5.09237 15.0527 5.01887C14.3047 4.94538 13.5493 5.04867 12.853 5.31964C12.1567 5.59061 11.5409 6.02094 11.06 6.57268C10.5791 7.12442 10.2478 7.78063 10.0953 8.48344C9.94276 9.18626 9.97376 9.9141 10.1855 10.6028C10.3973 11.2915 10.7833 11.9198 11.3095 12.4325V16.8746C11.3095 16.9812 11.3379 17.086 11.3923 17.1791C11.4466 17.2722 11.525 17.3505 11.62 17.4066C11.7149 17.4626 11.8234 17.4946 11.9349 17.4994C12.0465 17.5042 12.1574 17.4816 12.2573 17.4339L14.5833 16.323L16.9094 17.4339C17.0092 17.4816 17.1202 17.5042 17.2318 17.4994C17.3433 17.4946 17.4518 17.4626 17.5467 17.4066C17.6417 17.3505 17.7201 17.2722 17.7744 17.1791C17.8288 17.086 17.8572 16.9812 17.8572 16.8746V12.4325C18.6969 11.6167 19.1672 10.5185 19.1667 9.37479ZM14.5833 6.24989C15.2308 6.24989 15.8638 6.43316 16.4022 6.77653C16.9405 7.1199 17.3602 7.60794 17.6079 8.17894C17.8557 8.74995 17.9206 9.37826 17.7942 9.98443C17.6679 10.5906 17.3561 11.1474 16.8983 11.5844C16.4404 12.0215 15.8571 12.3191 15.222 12.4397C14.587 12.5602 13.9287 12.4983 13.3305 12.2618C12.7323 12.0253 12.221 11.6248 11.8613 11.1109C11.5015 10.597 11.3095 9.99284 11.3095 9.37479C11.3095 8.54602 11.6545 7.75119 12.2684 7.16515C12.8824 6.57912 13.7151 6.24989 14.5833 6.24989ZM14.8763 15.0652C14.7854 15.0218 14.6851 14.9992 14.5833 14.9992C14.4816 14.9992 14.3813 15.0218 14.2903 15.0652L12.6191 15.8637V13.327C13.2328 13.6053 13.9038 13.7497 14.5833 13.7497C15.2628 13.7497 15.9338 13.6053 16.5476 13.327V15.8637L14.8763 15.0652ZM10 14.3746C10 14.5404 9.93103 14.6994 9.80823 14.8166C9.68544 14.9338 9.5189 14.9996 9.34525 14.9996H2.14287C1.79556 14.9996 1.46248 14.8679 1.21689 14.6335C0.971311 14.3991 0.833344 14.0812 0.833344 13.7497V3.74996C0.833344 3.41845 0.971311 3.10052 1.21689 2.86611C1.46248 2.63169 1.79556 2.5 2.14287 2.5H16.5476C16.8949 2.5 17.228 2.63169 17.4736 2.86611C17.7192 3.10052 17.8572 3.41845 17.8572 3.74996C17.8572 3.91572 17.7882 4.07468 17.6654 4.19189C17.5426 4.3091 17.376 4.37494 17.2024 4.37494C17.0287 4.37494 16.8622 4.3091 16.7394 4.19189C16.6166 4.07468 16.5476 3.91572 16.5476 3.74996H2.14287V13.7497H9.34525C9.5189 13.7497 9.68544 13.8155 9.80823 13.9327C9.93103 14.0499 10 14.2089 10 14.3746ZM8.69049 9.99978C8.69049 10.1655 8.6215 10.3245 8.49871 10.4417C8.37592 10.5589 8.20938 10.6248 8.03572 10.6248H4.76191C4.58826 10.6248 4.42172 10.5589 4.29893 10.4417C4.17614 10.3245 4.10715 10.1655 4.10715 9.99978C4.10715 9.83402 4.17614 9.67505 4.29893 9.55785C4.42172 9.44064 4.58826 9.37479 4.76191 9.37479H8.03572C8.20938 9.37479 8.37592 9.44064 8.49871 9.55785C8.6215 9.67505 8.69049 9.83402 8.69049 9.99978ZM8.69049 7.49985C8.69049 7.66561 8.6215 7.82457 8.49871 7.94178C8.37592 8.05899 8.20938 8.12483 8.03572 8.12483H4.76191C4.58826 8.12483 4.42172 8.05899 4.29893 7.94178C4.17614 7.82457 4.10715 7.66561 4.10715 7.49985C4.10715 7.3341 4.17614 7.17513 4.29893 7.05792C4.42172 6.94072 4.58826 6.87487 4.76191 6.87487H8.03572C8.20938 6.87487 8.37592 6.94072 8.49871 7.05792C8.6215 7.17513 8.69049 7.3341 8.69049 7.49985Z"
                    fill="currentcolor"
                  ></path>
                </svg>
              </svg>
              <div>Certifications</div>
            </div>
            Yes
          </li>
          <li className="flex items-center justify-between border-b border-gray-300 mb-2 pb-2">
            <div className="flex gap-2 items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5604 4.97272C18.5604 4.97272 11.5036 1.96687 11.5018 1.96608C11.0252 1.76745 10.5199 1.66675 10 1.66675C9.48008 1.66675 8.97484 1.76745 8.49824 1.96608C8.49637 1.96687 1.43961 4.97272 1.43961 4.97272C0.565 5.33862 0 6.18722 0 7.1355C0 8.08378 0.565 8.93237 1.43961 9.29827L3.125 10.0162V14.948C3.125 16.2403 4.17641 17.2917 5.46875 17.2917H14.5312C15.8236 17.2917 16.875 16.2403 16.875 14.948V12.8648C16.875 12.4333 16.5252 12.0835 16.0937 12.0835C15.6623 12.0835 15.3125 12.4333 15.3125 12.8648V14.948C15.3125 15.3788 14.962 15.7292 14.5312 15.7292H5.46875C5.03797 15.7292 4.6875 15.3788 4.6875 14.948V10.6817C4.6875 10.6817 8.49637 12.3042 8.49824 12.305C8.97484 12.5035 9.48008 12.6042 10 12.6042C10.5198 12.6042 11.0251 12.5035 11.5017 12.305C11.5036 12.3042 18.5604 9.29827 18.5604 9.29827C19.435 8.93237 20 8.08378 20 7.1355C20 6.18722 19.435 5.33862 18.5604 4.97272ZM17.9563 7.85726C17.9545 7.85804 10.8983 10.8636 10.8983 10.8636C10.6138 10.9818 10.3116 11.0417 9.99996 11.0417C9.68832 11.0417 9.38609 10.9818 9.10168 10.8637C8.40086 10.5651 2.04551 7.85804 2.04363 7.85726C1.75137 7.73542 1.5625 7.45214 1.5625 7.1355C1.5625 6.81886 1.75137 6.53558 2.04367 6.41374C2.04555 6.41296 9.10172 3.40733 9.10172 3.40733C9.38613 3.28917 9.68836 3.22925 10 3.22925C10.3116 3.22925 10.6139 3.28917 10.8983 3.40733C10.8983 3.40733 17.9545 6.41296 17.9563 6.41374C18.2486 6.53558 18.4375 6.81886 18.4375 7.1355C18.4375 7.45214 18.2486 7.73542 17.9563 7.85726Z"
                  fill="currentcolor"
                ></path>
                <path
                  d="M19.2187 10.7779C18.7873 10.7779 18.4375 11.1277 18.4375 11.5592V14.948C18.4375 15.3795 18.7873 15.7292 19.2187 15.7292C19.6502 15.7292 20 15.3795 20 14.948V11.5592C20 11.1277 19.6502 10.7779 19.2187 10.7779Z"
                  fill="currentcolor"
                ></path>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5604 4.97272C18.5604 4.97272 11.5036 1.96687 11.5018 1.96608C11.0252 1.76745 10.5199 1.66675 10 1.66675C9.48008 1.66675 8.97484 1.76745 8.49824 1.96608C8.49637 1.96687 1.43961 4.97272 1.43961 4.97272C0.565 5.33862 0 6.18722 0 7.1355C0 8.08378 0.565 8.93237 1.43961 9.29827L3.125 10.0162V14.948C3.125 16.2403 4.17641 17.2917 5.46875 17.2917H14.5312C15.8236 17.2917 16.875 16.2403 16.875 14.948V12.8648C16.875 12.4333 16.5252 12.0835 16.0937 12.0835C15.6623 12.0835 15.3125 12.4333 15.3125 12.8648V14.948C15.3125 15.3788 14.962 15.7292 14.5312 15.7292H5.46875C5.03797 15.7292 4.6875 15.3788 4.6875 14.948V10.6817C4.6875 10.6817 8.49637 12.3042 8.49824 12.305C8.97484 12.5035 9.48008 12.6042 10 12.6042C10.5198 12.6042 11.0251 12.5035 11.5017 12.305C11.5036 12.3042 18.5604 9.29827 18.5604 9.29827C19.435 8.93237 20 8.08378 20 7.1355C20 6.18722 19.435 5.33862 18.5604 4.97272ZM17.9563 7.85726C17.9545 7.85804 10.8983 10.8636 10.8983 10.8636C10.6138 10.9818 10.3116 11.0417 9.99996 11.0417C9.68832 11.0417 9.38609 10.9818 9.10168 10.8637C8.40086 10.5651 2.04551 7.85804 2.04363 7.85726C1.75137 7.73542 1.5625 7.45214 1.5625 7.1355C1.5625 6.81886 1.75137 6.53558 2.04367 6.41374C2.04555 6.41296 9.10172 3.40733 9.10172 3.40733C9.38613 3.28917 9.68836 3.22925 10 3.22925C10.3116 3.22925 10.6139 3.28917 10.8983 3.40733C10.8983 3.40733 17.9545 6.41296 17.9563 6.41374C18.2486 6.53558 18.4375 6.81886 18.4375 7.1355C18.4375 7.45214 18.2486 7.73542 17.9563 7.85726Z"
                    fill="currentcolor"
                  ></path>
                  <path
                    d="M19.2187 10.7779C18.7873 10.7779 18.4375 11.1277 18.4375 11.5592V14.948C18.4375 15.3795 18.7873 15.7292 19.2187 15.7292C19.6502 15.7292 20 15.3795 20 14.948V11.5592C20 11.1277 19.6502 10.7779 19.2187 10.7779Z"
                    fill="currentcolor"
                  ></path>
                </svg>
              </svg>
              <div>Graduation</div>
            </div>
            {participation}
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-md font-semibold">Secure Payment:</h3>
        <div className="flex justify-around space-x-4 mt-2">
          <Image src={Paypal} alt="PayPal" width={70} height={30} />
          <Image src={Visa} alt="Visa" width={70} height={30} />
          <Image src={Mastercard} alt="MasterCard" width={70} height={30} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
