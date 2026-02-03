import React from "react";
import { useQuery } from "@tanstack/react-query";


import IssueCard from "./IssueCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";


const LatestResolvedIssues = () => {

    const axiosSecure = useAxiosSecure();
    

    const { data: issues = [], isLoading } = useQuery({

        queryKey: ["latest-resolved-issues"],
        queryFn: async () => {
            const res = await axiosSecure.get("/issues/resolved/latest");
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="my-6 md:my-8 lg:my-12">

            <h2 className="text-2xl md:text-4xl font-bold my-6 text-center">
                Latest Resolved Issues
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                {
                    issues.map(issue => (
                        <IssueCard
                            key={issue._id}
                            issue={issue}
                            
                        />
                    ))}
            </div>

        </div>
    );
};

export default LatestResolvedIssues;
