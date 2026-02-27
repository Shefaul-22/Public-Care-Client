import React from 'react';

const StatCard = ({ title, value, color = "badge-primary", icon = null }) => {
    return (
        <div className="card bg-base-100 dark:bg-base-200 shadow hover:shadow-lg transition-all duration-200">
            <div className="card-body items-center text-center">

                {/* Title + Icon */}
                <h2 className="text-sm font-semibold flex items-center gap-2 justify-center">
                    {icon && <span className="text-xl">{icon}</span>}
                    <span>{title}</span>
                </h2>

                {/* Value Badge */}
                <span
                    className={`badge badge-lg
                        ${color} 
                        ${color.includes("primary") ? "text-primary-content" : ""}
                        ${color.includes("success") ? "text-success-content" : ""}
                        ${color.includes("warning") ? "text-warning-content" : ""}
                        ${color.includes("error") ? "text-error-content" : ""}
                        transition-all duration-200 mt-2
                    `}
                >
                    {value !== undefined && value !== null ? value : "0"}
                </span>

            </div>
        </div>
    );
};

export default StatCard;