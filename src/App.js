import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { useCookies } from 'react-cookie'
import { ThemeProvider } from '@mui/material/styles';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import theme from './theme/Theme';

function App() {
	const [cookies] = useCookies();
	
	const link = from([
		new HttpLink({ uri: 'https://graphql-pokemon2.vercel.app/'})
	]);
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: link
	});

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				{ typeof cookies.authToken !== "undefined" ? (
					<ApolloProvider client={client}>
						<Dashboard/>
					</ApolloProvider>
				) : (
						<Login/>
					)}
			</div>
		</ThemeProvider>
	);
}

export default App;
