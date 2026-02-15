import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import Loading from "../../components/Loading/Loading";
import AllIssuesFilters from "./AllIssuesFilters";
import IssueCard from "./IssueCard";
import UseAxios from "../../hooks/UseAxios";

const AllIssues = () => {

    const { user, loading } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const axios = UseAxios();

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        category: "",
        priority: ""
    });

    // pagination
    const [page, setPage] = useState(1);


    // const { data: issues = [], isLoading, refetch } = useQuery({

    //     queryKey: ["allIssues", filters],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get("/issues", {
    //             params: filters
    //         });
    //         return res.data;
    //     }
    // });

    const { data = {}, refetch, isFetching } = useQuery({

        queryKey: [
            "allIssues",
            filters.search,
            filters.status,
            filters.category,
            filters.priority,
            page
        ],

        queryFn: async () => {
            const res = await axios.get("/issues", {
                params: {
                    ...filters,
                    page,

                }
            });
            return res.data;

        },
        keepPreviousData: true
    });

    // console.log(issues);

    const handleSetFilters = useCallback((update) => {
        setFilters(prev => {
            const newFilters =
                typeof update === "function" ? update(prev) : update;

            return newFilters;
        });

        setPage(1);
    }, []);


    const {
        issues = [],
        totalPages = 1,
        currentPage = 1,

        total

    } = data

    if (loading ) return <Loading />;

    return (

        <div>

            <h2 className="text-xl md:text-3xl lg:text-4xl my-4">
                All Issues Reported By Citizen: {total}
            </h2>

            {/* Filters */}
            <AllIssuesFilters

                filters={filters}
                // setFilters={setFilters}
                setFilters={handleSetFilters}

            />

            {
                isFetching && (
                    <div className="mt-4">
                        <Loading />
                    </div>
                )
            }

            {/* All issues Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                {
                    issues.map(issue => (
                        <IssueCard
                            key={issue._id}
                            issue={issue}
                            user={user}
                            refetch={refetch}

                            axiosSecure={axiosSecure}
                        />
                    ))}
            </div>

            {/* No data */}
            {issues.length === 0 && (
                <p className="text-center mt-6 text-gray-500">
                    No issues found
                </p>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-10">
                <button
                    className="btn btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>

                <span className="font-semibold">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="btn btn-sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllIssues;
