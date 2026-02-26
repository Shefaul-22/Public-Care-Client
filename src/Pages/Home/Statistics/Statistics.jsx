import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import Loading from "../../../components/Loading/Loading";



const Statistics = () => {

    const axios = UseAxios();

    const { data, isLoading } = useQuery({
        queryKey: ["statistics"],
        queryFn: async () => {
            const res = await axios.get("/issues", {
                params: { limit: 1000 }
            });

            const issues = res.data.issues;

            const total = issues.length;
            const resolved = issues.filter(i => i.status === "resolved").length;
            const pending = issues.filter(i => i.status === "pending").length;
            const inProgress = issues.filter(i => i.status === "in-progress").length;

            return { total, resolved, pending, inProgress };
        }
    });

    if (isLoading) return <Loading />;

    const stats = [
        { label: "Total Issues", value: data.total },
        { label: "Resolved", value: data.resolved },
        { label: "Pending", value: data.pending },
        { label: "In Progress", value: data.inProgress }
    ];

    return (
        <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">
                Platform Statistics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="glass-card p-6 text-center"
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
        </section>
    );
};

export default Statistics;