import {Link, Navigate, Outlet, useSearchParams } from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function DefaultLayout() {
  const [searchParams] = useSearchParams();
  const {user, token, setUser, setToken, notification} = useStateContext();
  // setToken(searchParams.get('token'));

  useEffect(() => {
    const tokenFromQuery = searchParams.get('token');
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    }
  }, [searchParams, setToken]);
  
  // if (!token) {
  //   return <Navigate to="/login"/>
  // }
  let API_URL = `${import.meta.env.VITE_API_BASE_URL}`;
  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/flows')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id="defaultLayout">
      <div className="content">
        <header>
          <div>
            <a className="home" href="/">
              <img className="waguru_logo" src="/assets/waguru.png"/>
            </a>
          </div>

          <div>
            <a className="btn-logout" href={API_URL + "/automation/waflows"}>Flows</a> &nbsp; &nbsp;
            {/* <a onClick={onLogout} className="btn-logout" href="#">Logout</a> */}
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className={`notification ${notification[1]}`}>
            {notification[1] == 'error' && (
              <FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" />
            )}
            {notification[1] == 'success' && (
              <FontAwesomeIcon icon="fa-solid fa-circle-check" />
            )}
            {notification[0]}
          </div>
        }
      </div>
    </div>
  )
}
