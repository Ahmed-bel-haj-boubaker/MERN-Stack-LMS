import { GetServerSideProps } from "next";
import cookie from "cookie";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

  return {
    props: {
      accessToken: cookies["access_token"] || null,
      refreshToken: cookies["refresh_token"] || null,
    },
  };
};
