import Swal from 'sweetalert2';

export default function GlobalPopup(props) {
    const {
        success,
        message
    } = props;

    if (success) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: message?message:'Request processed successfully!',
            showConfirmButton: false,
            timer: 4000
        });
        return setTimeout(() => { window.location.reload() }, 4000);
    }
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: message?message:'Failed to process request, please try again!',
        showConfirmButton: false,
        timer: 4000
    });
}
