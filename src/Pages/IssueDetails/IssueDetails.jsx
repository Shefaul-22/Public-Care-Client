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
import { useQuery } from "@tanstack/react-query";

const statusColors = {
  pending: "bg-yellow-500",
  "in-progress": "bg-blue-500",
  resolved: "bg-green-500",
  closed: "bg-gray-500"
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


  const { data: assignStaff = [] } = useQuery({

    queryKey: ["assign-staff"],

    queryFn: async () => {

      const res = await axiosSecure.get(`/users?email=${issue.staffEmail}`);
      return res.data;

    }
  })

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

    console.log(issue);


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
        title: issue.title
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

    <div className="p-4 w-full">

      <h2 className="text-3xl md:text-4xl lg:text-5xl my-4 md:my-6 lg:my-8 text-center">Issue Details Page</h2>

      <div className="flex  flex-col md:flex-row gap-3 md:gap-6">

        <div className="flex-1 ">
          <h2 className="text-3xl font-bold mb-2">Issue Name : {issue.title}</h2>


          <p className="mb-2 text-xl"><strong>Category :</strong> {issue.category}</p>

          <p className="mb-2 break-all text-xl">
            <strong>Description :</strong> {issue.issueDescription}
          </p>

        </div>

        <div className="relative  my-4 flex-1">
          {/* Issue Image */}
          <img
            src={issue.photoURL}
            alt={issue.issueName}
            className="w-full  object-cover rounded-lg"
          />

          {/* Status , prioroty badge */}
          <div className="absolute top-2 right-2 flex justify-between gap-3">
            <span
              className={`px-3 py-2 text-white text-xs rounded ${statusColors[issue.status]}`}
            >
              {issue.status}
            </span>

            <span
              className={`px-3 py-2 text-white text-xs rounded ${issue.priority === "high" ? "bg-red-500" : "bg-gray-500"
                }`}
            >
              {issue.priority === "high" ? "Boosted" : "Not Boosted"}

            </span>

            <span
              className={`px-3 py-2 text-white text-xs rounded ${issue.priority === "high" ? "bg-warning" : "bg-gray-500"
                }`}
            >
              {issue.priority === "high" ? "High" : "Normal"}

            </span>

          </div>
        </div>

      </div>

      <div className="flex gap-3 my-6 md:mb-8 lg:mb-12 right-2">

        {
          canEdit && <button onClick={() => setEditIssue(issue)} className="btn w-full btn-primary flex-1">Edit</button>
        }

        {
          canDelete && <button onClick={handleDelete} className="btn w-full btn-error flex-1">Delete</button>
        }

        {
          (issue.status !== "resolved" && issue.status !== "closed") &&
          (canBoost && <button onClick={() => handleBoost(issue)} className="btn w-full btn-warning flex-1">Boost Priority</button>)
        }

      </div>


      {
        issue.staffId && (

          <div className="my-4 md:my-8 lg:my-12">

            <h3 className="text-2xl md:text-4xl mb-2">Assigned Staff Details : </h3>

            <div className="mb-6 p-4 border rounded-lg shadow-md bg-base-200 flex flex-row  items-center gap-4">

              <img
                src={assignStaff.photoURL || "staffImg"}
                alt={issue.staffName}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="font-bold text-lg">Staff Name : {issue.staffName}</h3>

                {
                  assignStaff.phone && <p className="text-md text-gray-600">Phone: {assignStaff.phone}</p>
                }

                <p className="mt-1 text-md">
                  Status Message: <span className="text-gray-800 font-medium">{issue.statusMessage}</span>
                </p>
              </div>

              <div>
                <span className={`px-2 py-1 text-md font-semibold  rounded ${statusColors[issue.status]}`}>
                  {issue.status}
                </span>
              </div>

            </div>

          </div>
        )}




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

      <h2 className="text-2xl md:text-4xl  font-semibold mb-2">Issue Timeline</h2>

      <Timeline timeline={issue.timeline}>

      </Timeline>

    </div>
  );
};

export default IssueDetails;
