import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UserContextProvider } from './context/UserContext';
import { Professionals } from './Views/Professionals';
export const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5000,
                refetchOnWindowFocus: false
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <Professionals />
            </UserContextProvider>
            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    );
};
