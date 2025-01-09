async function loadAllDanhMuc(){
    var url = 'http://localhost:8080/api/danh-muc/findAll';
    const res = await fetch(url, {});
    var list = await res.json();
    console.log(list);
    var main = ''
    for (i = 0; i < list.length; i++) {
        main += `<tr>
        <td>${list[i].id}</td>
        <td>${list[i].ten}</td>
        <td><span onclick="xoaDanhMuc(${list[i].id})" class="deletebtn">Delete</span></td>
        <td><span onclick="loadADanhMuc(${list[i].id},'${list[i].ten}')" data-bs-toggle="modal" data-bs-target="#addtk" class="deletebtn">Edit</span></td>
    </tr>`
    }
    document.getElementById("listdanhmuc").innerHTML = main;
}

function loadADanhMuc(id, ten){
    document.getElementById("idcate").value = id;
    document.getElementById("catename").value = ten;
}

function clearData(){
    document.getElementById("idcate").value = '';
    document.getElementById("catename").value = '';
}


async function themDanhMuc() {
    var category = {
        "id": document.getElementById("idcate").value,
        "ten": catename = document.getElementById("catename").value,
    }
    const response = await fetch('http://localhost:8080/api/danh-muc/create-update', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(category)
    });
    if (response.status < 300) {
        toastr.success("thêm/sửa danh mục thành công!");
        loadAllDanhMuc();
        $("#addtk").modal('hide');
    }
    else {
        toastr.warning("Thất bại");
    }
}


async function xoaDanhMuc(id) {
    var con = confirm("Bạn chắc chắn muốn xóa danh mục này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/danh-muc/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE'
    });
    if (response.status < 300) {
        toastr.success("xóa danh mục thành công!");
        loadAllDanhMuc();
    }
    else {
        toastr.warning("Thất bại");
    }
}


async function loadAllDanhMucSelect(){
    var url = 'http://localhost:8080/api/danh-muc/findAll';
    const res = await fetch(url, {});
    var list = await res.json();
    var main = ''
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].ten}</option>`
    }
    document.getElementById("danhmuc").innerHTML = main;
}

var soDanhMuc = 0;
async function loadDanhMucTrangChu(){
    const res = await fetch('http://localhost:8080/api/danh-muc/findAll', {});
    var list = await res.json();
    soDanhMuc = list.length;
    var main = ''
    for (i = 0; i < list.length; i++) {
        var opt = '<option value="-1">Không</option>'
        for(j=0; j< list[i].monAns.length; j++){
            opt += `<option ${j==0?'selected':''} value="${list[i].monAns[j].id}">${list[i].monAns[j].ten}</option>`
        }
        main += `<div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left shadow h-100 py-2">
            <span class="lbcard">${list[i].ten}</span>
            <select class="form-controls" id="danhmucid${i}">
                ${opt}
            </select>
        </div>
    </div>`
    }
    document.getElementById("listdanhmucindex").innerHTML = main;
    setMau();
}

async function loadDanhMucTable(){
    const res = await fetch('http://localhost:8080/api/danh-muc/findAll', {});
    var list = await res.json();
    soDanhMuc = list.length
    var main = '<th>Ngày</th>'
    for (i = 0; i < list.length; i++) {
        main += `<th id="cot${list[i].id}">${list[i].ten}</th>`
    }
    main += `<th>Xóa</th><th>Cập nhật trạng thái</th>`
    document.getElementById("listdmtable").innerHTML = main;
}