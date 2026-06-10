import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

export default AnalyticsListener;
