import React from "react";
import { Stepper, Step, StepLabel, StepContent, Box, Typography } from "@mui/material";
import { CheckCircle, AccessTime, Cancel, Star } from "@mui/icons-material";

const statusIcons = {
    pending: <AccessTime />,
    "in-progress": <AccessTime />,
    resolved: <CheckCircle />,
    closed: <Cancel />,
    rejected: <Cancel />,
    assigned: <Star />,
    boosted: <Star />,
};

const statusColors = {
    pending: "orange",
    "in-progress": "blue",
    resolved: "green",
    closed: "gray",
    rejected: "red",
    assigned: "purple",
    boosted: "pink",
};

const Timeline = ({ timeline = [] }) => {


    const sortedTimeline = Array.isArray(timeline)
        ? [...timeline].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // oldest first for bottom-to-top
        : [];

    return (

        <Box sx={{ width: "100%" }}>
            <Stepper orientation="vertical" activeStep={-1}>

                {sortedTimeline.map((item, index) => (
                    <Step key={index} expanded>
                        {/* Left: Icon , Status */}
                        <StepLabel
                            icon={statusIcons[item.status] || <AccessTime />}
                            sx={{ color: statusColors[item.status] || "gray" }}
                        >
                            <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
                                {item.status}
                            </Typography>

                            <Typography variant="subtitle1" sx={{ display: "block" }}>
                                {new Date(item.createdAt).toLocaleString()}
                            </Typography>

                        </StepLabel>

                        {/* Right: Message / Action */}
                        <StepContent>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="body1">{item.message}</Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Updated by: {item.updatedBy?.role || "N/A"} ({item.updatedBy?.email || "N/A"})
                                </Typography>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default Timeline;
