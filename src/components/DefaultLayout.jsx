import {Link, Navigate, Outlet, useSearchParams } from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const [searchParams] = useSearchParams();
  const {user, token, setUser, setToken, notification} = useStateContext();
  setToken(searchParams.get('token'));
  // if (!token) {
  //   return <Navigate to="/login"/>
  // }
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
            <a className="btn-logout" href="http://127.0.0.1:8001/automation/waflows">Flows</a> &nbsp; &nbsp;
            {/* <a onClick={onLogout} className="btn-logout" href="#">Logout</a> */}
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
