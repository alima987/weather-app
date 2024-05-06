import { RootState } from '@/redux/store';
import { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface WeatherContextType {
    dispatch: ReturnType<typeof useDispatch>;
    currentCity: string | undefined;
  }
  
export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);
export const useWeather = () => {
    const contextValue = useContext(WeatherContext)
    if (!contextValue) {
        throw new Error('useWeather must be used within a WeatherProvider');
      }
    return contextValue;
}
const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const dispatch = useDispatch()
  const {currentCity} = useSelector((state: RootState) => state.city)


    const contextValue = {
        dispatch,
        currentCity
      };
    
      return (
        <WeatherContext.Provider value={contextValue}>
          {children}
        </WeatherContext.Provider>
      );
}
export default WeatherProvider