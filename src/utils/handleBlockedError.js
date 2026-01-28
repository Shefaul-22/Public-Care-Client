import Swal from "sweetalert2";

export function handleBlockedError(error) {
    // response from backend
    if (error.response?.status === 403 && error.response?.data?.message === "User is blocked") {
        Swal.fire({
            icon: 'error',
            title: 'Blocked',
            text: 'You are blocked and cannot perform this action.Please contact to Authority',
        });
        return true; // blocked
    }
    return false; // not blocked
}
