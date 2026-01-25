import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";

const AssignStaffModal = ({ issue, close }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [staffId, setStaffId] = useState("");

  const { data: staffs = [] ,isLoading,
    // refetch
  } = useQuery({
    queryKey: ["staffs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/staffs");
      return res.data;
    }
  });

  const handleAssign = async () => {
    const staff = staffs.find(s => s._id === staffId);

    await axiosSecure.patch(`/admin/issues/${issue._id}/assign`, {
      staffId: staff._id,
      name: staff.name,
      email: staff.email,
      
    });

    Swal.fire("Assigned", "Staff assigned successfully", "success");
    // refetch();
    queryClient.invalidateQueries(["issues"]);
    close();
  };

  if(isLoading) return <Loading />

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Assign Staff</h3>

        <select
          className="select select-bordered w-full"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
        >
          <option value="">Select Staff</option>
          {staffs.map(staff => (
            <option key={staff._id} value={staff._id}>
              {staff.name} ({staff.email})
            </option>
          ))}
        </select>

        <div className="modal-action">
          <button
            disabled={!staffId}
            onClick={handleAssign}
            className="btn btn-primary"
          >
            Confirm
          </button>
          <button onClick={close} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AssignStaffModal;
