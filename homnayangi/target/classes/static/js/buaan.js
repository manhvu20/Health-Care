var taikhoan = localStorage.getItem("taikhoan");
var userId = JSON.parse(taikhoan).id
async function loadBuaAnHomNay(){
    var url = 'http://localhost:8080/api/bua-an/bua-an-hom-nay?taikhoanId='+userId;
    const res = await fetch(url, {});
    var list = await res.json();
    await loadDanhMucTable();
    var main = ''
    for (i = 0; i < list.length; i++) {
        main += `<tr><td>${list[i].thoiDiem}, ${list[i].ngayAn}</td>`

        for(k=0; k<soDanhMuc; k++){
            main += `<td></td>`
        }

        main += `<td><span onclick="xoaBuaAn(${list[i].id})" class="deletebtn">Delete</span></td>`
        main += `<td>
        <select onchange="capNhatTrangThai(${list[i].id}, this)" class="form-control">
            <option ${list[i].trangThai == 'CHUA_HOAN_THANH'?'selected':''} value="CHUA_HOAN_THANH">Chưa hoàn thành</option>
            <option ${list[i].trangThai == 'DA_HOAN_THANH'?'selected':''} value="DA_HOAN_THANH">Đã hoàn thành</option>
        </select>
        </td>`
        main += `</tr>`
    }
    document.getElementById("listbuaan").innerHTML = main;


    var td = document.getElementById("cot1")
    col = td.cellIndex
    console.log(col);
    row = td.parentNode.rowIndex;
    console.log(row);

    for (i = 0; i < list.length; i++) {
        var buaAnMonAns = list[i].buaAnMonAns;

        for(j=0; j<buaAnMonAns.length; j++){
            var dm = buaAnMonAns[j].monAn.danhMuc 
            var td = document.getElementById("cot"+dm.id)
            var col = td.cellIndex
            console.log(col);
            document.getElementById("maintable").rows[i+1].cells[col].innerHTML =  buaAnMonAns[j].monAn.ten +' ('+buaAnMonAns[j].monAn.calo+' calo)'
        }

    }
}

async function lichSuAn(){
    var ngayan = document.getElementById("ngayan").value
    var url = 'http://localhost:8080/api/bua-an/find-by-user-and-date?taikhoanId='+userId;
    if(ngayan != ""){
        url +='&ngayan='+ngayan
    }
    const res = await fetch(url, {});
    var list = await res.json();
    await loadDanhMucTable();
    var main = ''
    for (i = 0; i < list.length; i++) {
        main += `<tr><td>${list[i].thoiDiem}, ${list[i].ngayAn}</td>`

        for(k=0; k<soDanhMuc; k++){
            main += `<td></td>`
        }

        main += `<td><span onclick="xoaBuaAn(${list[i].id})" class="deletebtn">Delete</span></td>`
        main += `<td>
        <select onchange="capNhatTrangThai(${list[i].id}, this)" class="form-control">
            <option ${list[i].trangThai == 'CHUA_HOAN_THANH'?'selected':''} value="CHUA_HOAN_THANH">Chưa hoàn thành</option>
            <option ${list[i].trangThai == 'DA_HOAN_THANH'?'selected':''} value="DA_HOAN_THANH">Đã hoàn thành</option>
        </select>
        </td>`
        main += `</tr>`
    }
    document.getElementById("listbuaan").innerHTML = main;


    var td = document.getElementById("cot1")
    col = td.cellIndex
    console.log(col);
    row = td.parentNode.rowIndex;
    console.log(row);

    for (i = 0; i < list.length; i++) {
        var buaAnMonAns = list[i].buaAnMonAns;

        for(j=0; j<buaAnMonAns.length; j++){
            var dm = buaAnMonAns[j].monAn.danhMuc 
            var td = document.getElementById("cot"+dm.id)
            var col = td.cellIndex
            console.log(col);
            document.getElementById("maintable").rows[i+1].cells[col].innerHTML =  buaAnMonAns[j].monAn.ten +' ('+buaAnMonAns[j].monAn.calo+' calo)'
        }

    }
}

async function themBuaAn() {
    var con = confirm("Bạn chắc chắn muốn thêm bữa này?");
    if (con == false) {
        return;
    }
    var arr = [];
    for(i=0; i<soDanhMuc; i++){
        var id = document.getElementById("danhmucid"+i).value;
        if(id != -1){
            arr.push(id);
        }
    }
    var buaan = {
        "thoiDiem": document.getElementById("thoidiem").value,
        "userId": userId,
        "listIdMonAn": arr,
    }
    const response = await fetch('http://localhost:8080/api/bua-an/create', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(buaan)
    });
    if (respose.status < 300) {
        swal({
            ntitle: "Thông báo",
            text: "Đã thêm bữa ăn",
            type: "success"
        },
        function() {
            window.location.reload();
        });
    }
    else {
        toastr.warning("Thất bại");
    }
}

async function capNhatTrangThai(id, e) {
    var trangthai = e.value
    const response = await fetch('http://localhost:8080/api/bua-an/update-trang-thai?id='+id+'&trangThai='+trangthai, {
    });
    if (response.status < 300) {
        toastr.success("Đã cập nhật trạng thái");
    }
    else {
        toastr.warning("Thất bại");
    }
}

async function xoaBuaAn(id) {
    var con = confirm("Bạn chắc chắn muốn xóa bữa ăn này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/bua-an/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE'
    });
    if (response.status < 300) {
        toastr.success("xóa thành công!");
        window.location.reload();
    }
    else {
        toastr.warning("Thất bại");
    }
}
