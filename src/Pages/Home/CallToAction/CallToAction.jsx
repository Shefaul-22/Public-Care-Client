import React from "react";
import { Link } from "react-router";

const CallToAction = () => {

    return (

        <section className="mt-20">

            <div className="glass-card text-center p-10">

                <h2 className="text-3xl font-bold mb-4">
                    Help Improve Your City
                </h2>

                <p className="text-gray-500 mb-6">
                    Report infrastructure problems and help authorities fix them faster.
                </p>

                <div className="flex justify-center gap-4">

                    <Link
                        to="/post-issue"
                        className="btn btn-primary"
                    >
                        Report an Issue
                    </Link>

                    <Link
                        to="/allIssues"
                        className="btn btn-outline"
                    >
                        Browse Issues
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default CallToAction;