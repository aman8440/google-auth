import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { constVariable } from '../environments/environments';

const Login = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onGoogleSuccess = (response : any) => {
    fetch(`${constVariable.REACT_APP_URL_API_LOGIN}auth/google`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: response.credential,
      }),
    })
      .then((r) => {
        if (!r.ok) {
          return r.text().then((text) => {
            throw new Error(text || "Unknown error occurred");
          });
        }
        return r.json();
      })
      .then((res) => {
        const { user, token } = res;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onGoogleFailure = (err: any) => {
    console.log(err);
  };

  return (
    <GoogleOAuthProvider clientId={constVariable.Google_clientId}>
      <GoogleLogin
        onSuccess={onGoogleSuccess}
        onError={()=>onGoogleFailure}
      />
    </GoogleOAuthProvider>
  );
};
export default Login;
