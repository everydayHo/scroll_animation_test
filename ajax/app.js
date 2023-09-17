async function request() {
  const response = await fetch('https://dummyjson.com/posts', {
    method: 'GET',
  });
  try {
    const container = document.querySelector('.container');
    const data = await response.json();
    console.log('data: ', data);
    const wrapper = document.createElement('ul');
    for (let i = 0; i < data.posts.length; i++) {
      const list = document.createElement('li');
      let item = `${data.posts[i].title}`;
      list.innerText = item;
      i++;
      wrapper.appendChild(list);
    }
    container.appendChild(wrapper);
  } catch {
    console.error('그거말고.');
  }
}
request();


