import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Flows() {
  const [flows, setFlows] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getFlows();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/flows/${user.id}`)
      .then(() => {
        setNotification(['Flow was successfully deleted',"success"])
        getFlows()
      })
  }

  const getFlows = () => {
    setLoading(true)
    axiosClient.get('/flows')
      .then(({ data }) => {
        setLoading(false)
        setFlows(data.results.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Flows</h1>
        <Link className="btn-add" to="/flows/new">Create Flow</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {flows.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  { u.data.nodes ? u.data.nodes[0].data.formData['flow_title'] : "N/A"}                  
                </td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/flows/' + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
