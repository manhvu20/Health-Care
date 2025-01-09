async function loadAllMonAn(){
    var url = 'http://localhost:8080/api/mon-an/findAll';
    const res = await fetch(url, {});
    var list = await res.json();
    var main = ''
    for (i = 0; i < list.length; i++) {
        main += `<tr>
        <td>${list[i].id}</td>
        <td>${list[i].ten}</td>
        <td>${list[i].calo}</td>
        <td>${list[i].nguyenLieu}</td>
        <td>${list[i].danhMuc.ten}</td>
        <td><span onclick="xoaMonAn(${list[i].id})" class="deletebtn">Delete</span></td>
        <td><span onclick="loadAMonAn(${list[i].id},'${list[i].ten}',${list[i].calo},'${list[i].nguyenLieu}',${list[i].danhMuc.id} )" data-bs-toggle="modal" data-bs-target="#addtk" class="deletebtn">Edit</span></td>
    </tr>`
    }
    document.getElementById("listmonan").innerHTML = main;
}

function loadAMonAn(id, ten, calo, nguyenlieu, danhmuc){
    document.getElementById("idmonan").value = id;
    document.getElementById("ten").value = ten;
    document.getElementById("calo").value = calo;
    document.getElementById("nguyenlieu").value = nguyenlieu;
    document.getElementById("danhmuc").value = danhmuc;
}

function clearDataMonAn(){
    document.getElementById("idmonan").value = '';
    document.getElementById("ten").value = '';
    document.getElementById("calo").value = '';
    document.getElementById("nguyenlieu").value = '';
}


async function themMonAn() {
    var monan = {
        "id": document.getElementById("idmonan").value,
        "ten": document.getElementById("ten").value,
        "calo": document.getElementById("calo").value,
        "nguyenLieu": document.getElementById("nguyenlieu").value,
        "danhMuc": {
            "id":document.getElementById("danhmuc").value
        },
    }
    console.log(monan);
    const response = await fetch('http://localhost:8080/api/mon-an/create-update', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(monan)
    });
    if (response.status < 300) {
        toastr.success("Thành công!");
        loadAllMonAn();
        $("#addtk").modal('hide');
    }
    else {
        toastr.warning("Thất bại");
    }
}


async function xoaMonAn(id) {
    var con = confirm("Bạn chắc chắn muốn xóa món ăn này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/mon-an/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE'
    });
    if (response.status < 300) {
        toastr.success("Xóa thành công!");
        loadAllMonAn();
    }
    else {
        toastr.warning("Thất bại");
    }
}