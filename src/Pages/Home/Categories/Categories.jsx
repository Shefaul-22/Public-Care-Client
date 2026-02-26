import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import Loading from "../../../components/Loading/Loading";

const Categories = () => {

    const axios = UseAxios();

    const { data = [], isLoading } = useQuery({

        queryKey: ["categories"],

        queryFn: async () => {

            const res = await axios.get("/issues", {
                params: { limit: 1000 }
            });

            const issues = res.data.issues;

            const categoryMap = {};

            issues.forEach(issue => {

                if (!categoryMap[issue.category]) {

                    categoryMap[issue.category] = 0;
                }

                categoryMap[issue.category]++;

            });

            return Object.entries(categoryMap).map(
                ([name, count]) => ({ name, count })
            );
        }
    });

    if (isLoading) return <Loading />;

    return (
        <section className="mt-16">

            <h2 className="text-3xl font-bold text-center mb-8">
                Issue Categories
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                {data.map((category, index) => (

                    <div key={index} className="glass-card p-6">

                        <h3 className="text-xl font-semibold">
                            {category.name}
                        </h3>

                        <p className="text-gray-500 mt-2">
                            {category.count} issues reported
                        </p>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default Categories;