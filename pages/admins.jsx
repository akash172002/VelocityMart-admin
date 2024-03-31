import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import PrettyDate from "@/lib/date";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function AdminPage({ swal }) {
  const [email, setEmail] = useState("");
  const [adminEmails, setAdminEamils] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  function addAdmin(e) {
    e.preventDefault();
    axios
      .post("/api/admins", { email })
      .then((res) => {
        swal.fire({
          title: "Admin created",
          icon: "success",
        });
        setEmail("");
        loadAdmin();
      })
      .catch((err) => {
        swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "Error",
        });
      });
  }

  function loadAdmin() {
    setIsloading(true);
    axios.get("/api/admins").then((res) => {
      setAdminEamils(res.data);
      setIsloading(false);
    });
  }

  function deleteAdmin(_id, email) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${email} ?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          axios.delete("/api/admins?_id=" + _id).then(() => {
            swal.fire({
              title: "Admin deleted",
              icon: "success",
            });
            loadAdmin();
          });
        }
      });
  }

  useEffect(() => {
    loadAdmin();
  }, []);

  return (
    <Layout>
      <h2>Admins</h2>

      <h2>Add new admin</h2>
      <form onSubmit={addAdmin}>
        <div className="flex gap-2">
          <input
            type="text"
            className="mb-0"
            placeholder="Google email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email && (
            <button
              type="submit"
              className="btn-primary py-1 whitespace-nowrap"
            >
              Add admin
            </button>
          )}
        </div>
      </form>

      <h2>Existing admins</h2>
      <table className="basic">
        <thead>
          <tr>
            <th className="text-left">Admin google email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <Spinner />
              </td>
            </tr>
          )}
          {adminEmails.length > 0 &&
            adminEmails.map((email) => (
              <tr key={email}>
                <td>{email.email}</td>
                <td>{email.createdAt && PrettyDate(email.createdAt)}</td>
                <td>
                  <button
                    onClick={() => deleteAdmin(email._id, email.email)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }) => <AdminPage swal={swal} />);
