import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";


import IssueCard from "./IssueCard";
import Loading from "../../../components/Loading/Loading";
import UseAxios from "../../../hooks/UseAxios";


const LatestResolvedIssues = () => {

    // const axiosSecure = useAxiosSecure();

    const axios = UseAxios();

    const {user} = UseAuth();
    

    const { data: issues = [], isLoading } = useQuery({

        queryKey: ["latest-resolved-issues"],
        queryFn: async () => {
            const res = await axios.get("/issues/resolved/latest");
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="my-6 md:my-8 lg:my-12 ">

            <h2 className="text-2xl md:text-5xl font-bold my-6 text-center">
                Latest <span className="text-[#fa0bd2]">Resolved Issues</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                {
                    issues.map(issue => (

                        <IssueCard
                        
                            key={issue._id}
                            issue={issue}
                            user={user}
                            
                        />
                    ))}
            </div>

        </div>
    );
};

export default LatestResolvedIssues;
