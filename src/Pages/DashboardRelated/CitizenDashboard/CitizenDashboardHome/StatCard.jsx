import React from 'react';

const StatCard = ({ title, value, color = "badge-primary" }) => {
    return (
        <div className="card bg-base-200 shadow">
            <div className="card-body items-center text-center">
                <h2 className="text-sm font-semibold">{title}</h2>
                <span className={`badge badge-lg ${color}`}>
                    

                    {
                        (value !== 0) ? value : "0"
                    }
                    
                </span>
            </div>
        </div>
    );
};


export default StatCard;