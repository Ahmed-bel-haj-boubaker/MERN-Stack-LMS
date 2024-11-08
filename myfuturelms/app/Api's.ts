interface IApi {
  localhost: string;
  register: string;
  activate_user: string;
  login: string;
  forgot_password: string;
  verify_code: string;
}

const Api: IApi = {
  localhost: "http://localhost:8000/api/v1/",
  register: "http://localhost:8000/api/v1/register",
  activate_user: "http://localhost:8000/api/v1/activate-user",
  login: "http://localhost:8000/api/v1/login-user",
  forgot_password: "http://localhost:8000/api/v1/forget-password",
  verify_code: "http://localhost:8000/api/v1/verify-code",
};

export default Api;
