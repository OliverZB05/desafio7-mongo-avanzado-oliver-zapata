function goToProducts() {
    Swal.fire({
        title: 'Cargando productos...',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            window.location.href = '/products';
        }
    });
}

