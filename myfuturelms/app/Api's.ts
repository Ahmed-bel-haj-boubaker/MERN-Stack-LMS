interface IApi {
  localhost: string;
  register: string;
  activate_user: string;
  login: string;
}

const Api: IApi = {
  localhost: "http://localhost:8000/api/v1/",
  register: "http://localhost:8000/api/v1/register",
  activate_user: "http://localhost:8000/api/v1/activate-user",
  login: "http://localhost:8000/api/v1/login-user",
};

export default Api;
