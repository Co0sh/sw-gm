import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface NavLinkData {
  label: string;
  url: string;
  icon: ReactNode;
}

interface NavigationManagerProps {}

const NavigationManager: FC<NavigationManagerProps> = ({ children }) => {
  const [links, setLinks] = useState<NavLinkData[]>([]);

  return (
    <NavigationManagerContext.Provider value={{ links, setLinks }}>
      {children}
    </NavigationManagerContext.Provider>
  );
};

interface NavigationManagerContextType {
  links: NavLinkData[];
  setLinks: Dispatch<SetStateAction<NavLinkData[]>>;
}

const NavigationManagerContext = createContext<NavigationManagerContextType>({
  links: [],
  setLinks: () => {
    console.warn('Trying to set links outside of NavigatorManager context');
  },
});

export const useLinks = () => useContext(NavigationManagerContext).links;

export const useSetLinks = (links: NavLinkData[]) => {
  const { setLinks } = useContext(NavigationManagerContext);
  useEffect(() => {
    setLinks(links);
  }, [setLinks, links]);
};

export default NavigationManager;
