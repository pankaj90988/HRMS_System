import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const emptyForm = {
  address: "",
  phone: "",
  profileLink: "",
  IdCardLink: "",
  resumeLink: "",
  salary: "",
};

const ViewEmployee = () => {
  const { id } = useParams();
  const { isHR } = useAuth();
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchDetail = async () => {
    try {
      const res = await axiosInstance.post("/personalDetail/ViewEmployee", { employeeId: id });
      setDetail(res.data);
      setForm({
        address: res.data.address || "",
        phone: res.data.phone || "",
        profileLink: res.data.profileLink || "",
        IdCardLink: res.data.IdCardLink || "",
        resumeLink: res.data.resumeLink || "",
        salary: res.data.salary ?? "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosInstance.post("/personalDetail/EditEmployee", {
        requestedId: id,
        ...form,
      });
      toast.success("Details updated");
      fetchDetail();
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-8 text-gray-500">Loading...</div>;
  if (!detail) return <div className="max-w-2xl mx-auto px-4 py-8 text-gray-500">Not found</div>;

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">{detail.userId?.email}</h1>
      <p className="text-gray-500 mb-6">Role: {detail.userId?.role}</p>

      <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile link</label>
          <input name="profileLink" value={form.profileLink} onChange={handleChange} className={inputClass} />
        </div>

        {isHR && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Card link</label>
              <input name="IdCardLink" value={form.IdCardLink} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resume link</label>
              <input name="resumeLink" value={form.resumeLink} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                type="number"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
};

export default ViewEmployee;
