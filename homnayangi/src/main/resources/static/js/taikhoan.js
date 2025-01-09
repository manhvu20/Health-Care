async function dangNhap() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var url = 'http://localhost:8080/api/tai-khoan/dang-nhap?email='+email+'&matkhau='+password
    const response = await fetch(url, {
        method: 'POST'
    });
    var result = await response.json();
    console.log(result)
    if (response.status < 300) {
        if (response.status == 208) {
            toastr.warning(result.defaultMessage);
            return;
        }
        else{
        localStorage.setItem("taikhoan", JSON.stringify(result));
                window.location.href = 'index';
        }
    }
}

async function dangKy() {
    var url = 'http://localhost:8080/api/tai-khoan/dang-ky'
    var email = document.getElementById("email").value
    var hoten = document.getElementById("hoten").value
    var gioitinh = document.getElementById("gioitinh").value
    var chieucao = document.getElementById("chieucao").value
    var cannang = document.getElementById("cannang").value
    var tuoi = document.getElementById("tuoi").value
    var password = document.getElementById("password").value
    var repassword = document.getElementById("repassword").value
    if(password != repassword){
        toastr.warning("Mật khẩu không trùng khớp");
        return;
    }
    var taikhoan = {
        "email": email,
        "matKhau": password,
        "hoTen": hoten,
        "gioiTinh": gioitinh,
        "chieuCao": chieucao,
        "canNang": cannang,
        "tuoi": tuoi,
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(taikhoan)
    });

    if (response.status < 300) {
        if (response.status == 208) {
                var result = await response.json();
                toastr.warning(result.defaultMessage);
                return;
         }
        else{
        swal({
                        title: "Thông báo",
                        text: "đăng ký thành công",
                        type: "success"
                    },
                    function() {
                        window.location.href = 'login'
                    });
        }
    }

}

async function loadThongTinTaiKhoan(){
    var taikhoan = localStorage.getItem("taikhoan");
    taikhoan = JSON.parse(taikhoan)
    document.getElementById("email").value = taikhoan.email;
    document.getElementById("hoten").value = taikhoan.hoTen;
    document.getElementById("chieucao").value = taikhoan.chieuCao;
    document.getElementById("cannang").value = taikhoan.canNang;
    document.getElementById("gioitinh").value = taikhoan.gioiTinh;
    document.getElementById("tuoi").value = taikhoan.tuoi;
    var bmi = taikhoan.canNang / ((taikhoan.chieuCao/100) * (taikhoan.chieuCao/100))
    bmi = bmi.toFixed(2)
    document.getElementById("bmi").innerHTML = bmi

    var calocan = 0;
    if(taikhoan.gioiTinh == 'Nữ'){
        calocan = (6.25 * taikhoan.chieuCao) + (10 * taikhoan.canNang) - (5 * taikhoan.tuoi) - 161
    }
    if(taikhoan.gioiTinh == 'Nam'){
        calocan = (6.25 * taikhoan.chieuCao) + (10 * taikhoan.canNang) - (5 * taikhoan.tuoi) + 5
    }
    document.getElementById("calocan").innerHTML = calocan


    if(bmi < 16){
             document.getElementById("quagay").style.display = 'block'
         }
         else if(bmi < 18.5){
             document.getElementById("hoigay").style.display = 'block'
         }
         else if(bmi < 23){
             document.getElementById("hoanhao").style.display = 'block'
         }
         else if(bmi < 25){
             document.getElementById("vuavan").style.display = 'block'
         }
         else if(bmi < 30){
             document.getElementById("thuacan").style.display = 'block'
         }
         else if(bmi > 30){
             document.getElementById("quabeo").style.display = 'block'
         }
}


async function capNhatTaiKhoan() {
    var taikhoan = localStorage.getItem("taikhoan");
    taikhoan = JSON.parse(taikhoan)
    var url = 'http://localhost:8080/api/tai-khoan/cap-nhat'
    var email = document.getElementById("email").value
    var hoten = document.getElementById("hoten").value
    var gioitinh = document.getElementById("gioitinh").value
    var chieucao = document.getElementById("chieucao").value
    var cannang = document.getElementById("cannang").value
    var tuoi = document.getElementById("tuoi").value
    var taikhoan = {
        "id":taikhoan.id,
        "email": email,
        "hoTen": hoten,
        "gioiTinh": gioitinh,
        "chieuCao": chieucao,
        "canNang": cannang,
        "tuoi": tuoi,
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(taikhoan)
    });
    var result = await response.json();

    if (response.status < 300) {
        if (response.status == 208) {
                var result = await response.json();
                toastr.warning(result.defaultMessage);
                return;
        }
        else{
            localStorage.setItem("taikhoan", JSON.stringify(result));
                swal({
                        title: "Thông báo",
                        text: "Cập nhật thành công",
                        type: "success"
                    },
                    function() {
                        window.location.reload();
                    });
        }
    }

}

