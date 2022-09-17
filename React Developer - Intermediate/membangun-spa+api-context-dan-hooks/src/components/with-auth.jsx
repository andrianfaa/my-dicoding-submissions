/* eslint-disable func-names */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts";
import { getUserProfile } from "@/services";
import { LocalStorage } from "@/utils";

export const withAuth = (Component) => function (props) {
  const [auth, setAuth] = useState({
    user: LocalStorage.get("user") || null,
    token: LocalStorage.get("token") || null,
  });

  async function fetchUserProfile() {
    if (!auth.token) return;

    await getUserProfile(auth.token)
      .then((res) => {
        if (!res.error) {
          setAuth((prevState) => ({
            ...prevState,
            user: res.data,
          }));
        }

        if (res.error && res.status === 401) {
          LocalStorage.remove("user");
          LocalStorage.remove("token");

          setAuth((prevState) => ({
            ...prevState,
            user: null,
            token: null,
          }));
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          LocalStorage.remove("user");
          LocalStorage.remove("token");

          setAuth((prevState) => ({
            ...prevState,
            user: null,
            token: null,
          }));
        }
      });
  }

  useEffect(() => {
    if (auth.token) {
      fetchUserProfile();
    }
  }, [auth.token]);

  useEffect(() => {
    if (auth.user) LocalStorage.set("user", auth.user);
    if (auth.token) LocalStorage.set("token", auth.token);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Component {...props} auth={auth} />
    </AuthContext.Provider>
  );
};
