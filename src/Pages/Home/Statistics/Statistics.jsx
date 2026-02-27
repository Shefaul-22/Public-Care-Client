import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import Loading from "../../../components/Loading/Loading";

const Statistics = () => {

    const axios = UseAxios();

    const { data, isLoading } = useQuery({
        queryKey: ["statistics"],
        queryFn: async () => {

            const res = await axios.get("/issues/statistics");

            return res.data;
        }
    });

    if (isLoading || !data) return <Loading />;

    const stats = [
        { label: "Total Issues", value: data.totalNum },
        { label: "Resolved", value: data.resolved },
        { label: "Closed", value: data.closed },
        { label: "Pending", value: data.pending },
        { label: "In Progress", value: data.inProgress }
    ];

    return (
        <div className="  rounded-2xl">

            <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
                Platform Statistics
            </h2>

            {/* responsive fix */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

                {stats.map((stat, index) => (

                    <div
                        key={index}
                        className="card bg-teal-100 p-6 text-center"
                    >
                        <h3 className="text-3xl font-bold text-primary">
                            {stat.value}
                        </h3>

                        <p className="text-gray-500 mt-2">
                            {stat.label}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Statistics;