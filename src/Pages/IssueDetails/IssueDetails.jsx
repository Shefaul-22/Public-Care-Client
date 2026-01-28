// IssueDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import Swal from "sweetalert2";
// import IssueTimeline from "./IssueTimeline";
import Loading from "../../components/Loading/Loading";
import EditIssueModal from "../DashboardRelated/CitizenDashboard/MyIssues/EditIssueModal";
import Timeline from "./Timeline";
import { handleBlockedError } from "../../utils/handleBlockedError";

const statusColors = {
  Pending: "bg-yellow-500",
  "In-Progress": "bg-blue-500",
  Resolved: "bg-green-500",
  Closed: "bg-gray-500"
};

const IssueDetails = () => {
  const { id } = useParams();
  const { user, loading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [editIssue, setEditIssue] = useState(null);



  useEffect(() => {
    axiosSecure.get(`/issues/${id}`)
      .then(res => setIssue(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   if (params.get('payment') === 'cancelled') {
  //     Swal.fire('Payment Cancelled', 'You did not complete the payment.', 'info');
  //   }
  // }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          if (res.data.success) {
            axiosSecure.get(`/issues/${id}`).then(r => setIssue(r.data));
            Swal.fire('Success', 'Issue priority updated!', 'success');
          }
        })
        .catch(err => console.error(err));
    } else if (params.get('payment') === 'cancelled') {
      Swal.fire('Payment Cancelled', 'You did not complete the payment.', 'info');
    }
  }, [id]);





  // console.log('Boosting issue:', issue);



  if (!issue || loading) return <Loading></Loading>
  console.log(issue);
  // console.log(user?.email, issue);
  const isCreator = user?.email === issue.senderEmail;
  const canEdit = isCreator && issue.status === "pending";
  const canDelete = isCreator;
  const canBoost = issue.priority !== "high";

  const handleDelete = async () => {

    try {

      const confirm = await

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!"
        });

      if (confirm.isConfirmed) {
        await axiosSecure.delete(`/issues/${id}`);
        Swal.fire("Deleted!", "Issue has been deleted.", "success");
        navigate("/dashboard/my-issues");
      }
    }
    catch (error) {

      if (!handleBlockedError(error)) {

        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Something went wrong",
        });
      }

    }


  };




  const handleBoost = async (issue) => {


    const confirm = await Swal.fire({
      title: "Boost Issue",
      text: "Pay 100 TK to boost priority",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay & Boost"
    });

    if (!confirm.isConfirmed) return;

    try {
      const paymentInfo = {
        issueId: issue._id,
        boostedBy: user.email, // stripe needs email
        issueName: issue.title
      };

      const res = await axiosSecure.post(`/create-checkout-session`, paymentInfo);

      // redirect user to Stripe checkout
      window.location.href = res.data.url;

    } catch (error) {

      console.error("Boost payment error:", error);

      // Swal.fire("Error", "Failed to initiate payment.", "error");
      if (!handleBlockedError(error)) {

        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Something went wrong",
        });
      }

    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">{issue.issueName}</h2>
      <div className="flex items-center gap-4 mb-4">
        <span className={`px-2 py-1 text-white text-xs rounded ${statusColors[issue.status]}`}>
          {issue.status}
        </span>

        <span className={`px-2 py-1 text-white text-xs rounded ${issue.priority === "high" ? "bg-red-500" : "bg-gray-500"}`}>
          {issue.priority === "high" ? "Boosted" : "Normal"}
        </span>

      </div>

      <p className="mb-2"><strong>Category:</strong> {issue.category}</p>
      <p className="mb-2"><strong>Description:</strong> {issue.issueDescription}</p>

      <img src={issue.photoURL} alt={issue.issueName} className="w-64 h-64 object-cover my-4 rounded" />

      {issue.staffAssigned && (
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">Assigned Staff</h3>
          <p>Name: {issue.staffAssigned.name}</p>
          <p>Email: {issue.staffAssigned.email}</p>
        </div>
      )}

      <div className="flex gap-3 mb-6">

        {
          canEdit && <button onClick={() => setEditIssue(issue)} className="btn btn-primary">Edit</button>
        }

        {
          canDelete && <button onClick={handleDelete} className="btn btn-error">Delete</button>
        }

        {
          (issue.status !== "resolved" && issue.status !== "closed") &&
          (canBoost && <button onClick={() => handleBoost(issue)} className="btn btn-warning">Boost Priority</button>)
        }

      </div>

      {
        editIssue && (
          <EditIssueModal

            issue={editIssue}
            onClose={() => setEditIssue(null)}
            onUpdated={async () => {
              setEditIssue(null);
              // setIssue(issue)

              const res = await axiosSecure.get(`/issues/${id}`);
              setIssue(res.data);

            }}


          ></EditIssueModal>
        )
      }

      <h2 className="text-xl font-semibold mb-2">Issue Timeline</h2>

      <Timeline timeline={issue.timeline}>

      </Timeline>

    </div>
  );
};

export default IssueDetails;
