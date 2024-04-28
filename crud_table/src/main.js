import axios from 'axios';
import Swal from 'sweetalert2';

function getData() {
	return new Promise((resolve, reject) => {
		axios
			.get('http://localhost:3001/member')
			.then((Response) => {
				resolve(Response.data);
			})
			.catch((Error) => {
				reject(Error);
			});
	});
}

const tbody = document.querySelector('.member_tb');
const inputEls = document.querySelectorAll('.input_wrap input');

getData()
	.then((data) => {
		for (let i = 0; i < data.length; i++) {
			const tbTr = `<tr>
    <td>${data[i].id}</td>
    <td>${data[i].userName}</td>
    <td>${data[i].phoneNumber}</td>
    <td>${data[i].position}</td>
    </tr>`;
			tbody.insertAdjacentHTML('beforeend', String(tbTr));
		}
		inputEls[0].value = data.length + 1;
	})
	.catch((err) => {
		console.log(err);
	});

getData();

tbody.addEventListener('click', (e) => {
	if (e.target.parentElement.tagName === 'TR') {
		const rowData = e.target.parentElement.children;
		const rowDataArr = [...rowData];
		rowDataArr.forEach((val, idx) => {
			inputEls.forEach((el, i) => {
				if (idx === i) {
					el.value = val.innerText;
				}
			});
		});
	}
});

const createBtn = document.querySelector('.create_btn');
const modifyBtn = document.querySelector('.modify_btn');
const deleteBtn = document.querySelector('.delete_btn');

createBtn.addEventListener('click', (e) => {
	e.preventDefault();

	Swal.fire({
		title: '멤버 생성',
		text: '새로 생성하시겠습니까?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonText: '아니요',
		cancelButtonColor: '#d33',
		confirmButtonText: '네!',
	}).then((result) => {
		console.log(result);
		if (result.isConfirmed) {
			axios.post('http://localhost:3001/member', {
				id: inputEls[0].value,
				userName: inputEls[1].value,
				phoneNumber: inputEls[2].value,
				position: inputEls[3].value,
			});
			window.location.reload();
			inputEls.forEach((el) => (el.value = ''));
		} else if (result.isDismissed) {
			Swal.fire('취소했습니다.', '', 'info');
		}
	});
});

modifyBtn.addEventListener('click', (e) => {
	e.preventDefault();
	Swal.fire({
		title: '멤버 정보 수정',
		text: '수정하시겠습니까?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonText: '아니요',
		cancelButtonColor: '#d33',
		confirmButtonText: '네!',
	}).then((result) => {
		console.log(result);
		if (result.isConfirmed) {
			axios.patch(`http://localhost:3001/member/${inputEls[0].value}`, {
				id: inputEls[0].value,
				userName: inputEls[1].value,
				phoneNumber: inputEls[2].value,
				position: inputEls[3].value,
			});
			window.location.reload();
			inputEls.forEach((el) => (el.value = ''));
		} else if (result.isDismissed) {
			Swal.fire('취소했습니다.', '', 'info');
		}
	});
});

deleteBtn.addEventListener('click', (e) => {
	e.preventDefault();
	Swal.fire({
		title: '삭제',
		text: '삭제하시겠습니까?',
		icon: 'question',
		showCancelButton: true,
		cancelButtonText: '아니요',
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '네!',
	}).then((result) => {
		if (result.isConfirmed) {
			axios.delete(`http://localhost:3001/member/${inputEls[0].value}`);
			window.location.reload();
			inputEls.forEach((el) => (el.value = ''));
		} else if (result.isDismissed) {
			Swal.fire('취소했습니다.', '', 'info');
		}
	});
});
