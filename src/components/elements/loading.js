import { Slide } from '@material-ui/core';
import React from 'react';
import Swal from 'sweetalert2';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function loading() {
    Swal.fire({
        // title: 'Loading',
        html: 'Loading',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        },
    })
}