import { useEffect } from 'react';

function App() {
	useEffect(() => {
		console.log('ffff');
	}, []);

	return (
		<div className="App">
			<h1>안녕하세요</h1>
		</div>
	);
}

export default App;
