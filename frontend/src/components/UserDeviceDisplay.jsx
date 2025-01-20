import { useDevices} from 'react-device-detect'


function UserDeviceDisplay() {
    const { isMobile, isTablet, isLaptop, isDesktop } = useDevices();
    return (
        <div>
            <h1>Device Information</h1>
            <p>Is Mobile: {isMobile ? "Yes" : "No"}</p>
            <p>Is Tablet: {isTablet ? "Yes" : "No"}</p>
            <p>Is Laptop: {isLaptop ? "Yes" : "No"}</p>
            <p>Is Desktop: {isDesktop ? "Yes" : "No"}</p>
        </div>
    );
}

export default UserDeviceDisplay;