import { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { isAuthenticated } from "./auth";

const { publicRuntimeConfig } = getConfig();

const WithAuth = (WrappedComponent: ComponentType<any>) => {
  const AuthenticatedComponent = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        if (!isAuthenticated()) {
          localStorage.clear();
          router.push(publicRuntimeConfig.login);
          return;
        }

        const token = localStorage.getItem("access_token");
        if (token) {
          const decodedToken: { exp: number } = jwtDecode(token);
          const currentTime = Date.now() / 1000;
            console.log(decodedToken.exp, currentTime);
          if (decodedToken.exp < currentTime) {
            localStorage.clear();
            router.push(publicRuntimeConfig.login);
            toast.warn("Session expired");
            return;
          }
        }
        setIsAuthorized(true);
      };

      checkAuth();
    }, [router]);

    if (!isAuthorized) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default WithAuth;

